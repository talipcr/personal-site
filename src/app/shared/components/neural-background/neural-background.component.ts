import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { animate, scroll } from 'motion';
import {
  duration,
  easeOutExpo,
  prefersReducedMotion,
} from '../../motion/motion.tokens';

interface NeuralNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
}

@Component({
  selector: 'app-neural-background',
  template: `
    <div *ngIf="halo" #haloEl class="halo"></div>
    <canvas #canvas aria-hidden="true"></canvas>
  `,
  host: { 'aria-hidden': 'true' },
  styleUrls: ['./neural-background.component.scss'],
})
export class NeuralBackgroundComponent implements AfterViewInit, OnDestroy {
  @Input() linkDistance = 150;
  @Input() pointerDistance = 180;
  @Input() maxNodes = 90;
  @Input() halo = true;
  /** Drift speed and edge opacity follow page scroll progress */
  @Input() scrollReactive = true;

  @ViewChild('canvas', { static: true })
  private canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('haloEl') private haloRef?: ElementRef<HTMLElement>;

  private ctx!: CanvasRenderingContext2D;
  private nodes: NeuralNode[] = [];
  private width = 0;
  private height = 0;
  private rafId = 0;
  private lastTime = 0;
  private pointer: { x: number; y: number } | null = null;
  private nodeColor = '';
  private edgeColor = '';
  private speedFactor = 1;
  private edgeFactor = 1;
  private stopScroll: VoidFunction[] = [];
  private motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  constructor(private zone: NgZone, private host: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    if (!ctx) return;
    this.ctx = ctx;

    const styles = getComputedStyle(document.documentElement);
    this.nodeColor = styles.getPropertyValue('--node').trim();
    this.edgeColor = styles.getPropertyValue('--edge').trim();

    // Outside Angular: animation must never trigger change detection
    this.zone.runOutsideAngular(() => {
      this.resize();
      window.addEventListener('resize', this.resize, { passive: true });
      window.addEventListener('pointermove', this.onPointerMove, { passive: true });
      document.addEventListener('pointerleave', this.onPointerLeave);
      document.addEventListener('visibilitychange', this.onVisibilityChange);
      this.motionQuery.addEventListener('change', this.onMotionChange);
      this.start();
      this.animateIn();
    });
  }

  private animateIn(): void {
    if (prefersReducedMotion()) return;

    animate(
      this.host.nativeElement,
      { opacity: [0, 1] },
      { duration: duration.slow, ease: easeOutExpo }
    );
    if (this.scrollReactive) {
      // Deeper in the page: slightly faster drift, slightly fainter edges
      this.stopScroll.push(
        scroll((progress: number) => {
          this.speedFactor = 1 + progress * 0.6;
          this.edgeFactor = 1 - progress * 0.35;
        })
      );
    }
    if (this.haloRef) {
      // Scroll-linked animation: runs on the compositor when supported
      this.stopScroll.push(
        scroll(animate(this.haloRef.nativeElement, { y: [0, 160] }, { ease: 'linear' }))
      );
    }
  }

  ngOnDestroy(): void {
    this.stop();
    this.stopScroll.forEach((stop) => stop());
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerleave', this.onPointerLeave);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
    this.motionQuery.removeEventListener('change', this.onMotionChange);
  }

  private get reducedMotion(): boolean {
    return this.motionQuery.matches;
  }

  private start(): void {
    this.stop();
    if (this.reducedMotion || document.hidden) {
      this.draw(0);
      return;
    }
    this.lastTime = 0;
    this.rafId = requestAnimationFrame(this.tick);
  }

  private stop(): void {
    cancelAnimationFrame(this.rafId);
    this.rafId = 0;
  }

  private tick = (time: number): void => {
    // Normalised to 60fps so speed stays constant on any refresh rate
    const dt = this.lastTime ? Math.min((time - this.lastTime) / 16.67, 3) : 1;
    this.lastTime = time;
    this.move(dt);
    this.draw(time);
    this.rafId = requestAnimationFrame(this.tick);
  };

  private resize = (): void => {
    const canvas = this.canvasRef.nativeElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    canvas.width = Math.round(this.width * dpr);
    canvas.height = Math.round(this.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // ~1 node per 16000px², fewer on mobile, capped at maxNodes
    const target = Math.max(
      24,
      Math.min(this.maxNodes, Math.round((this.width * this.height) / 16000))
    );
    while (this.nodes.length < target) this.nodes.push(this.createNode());
    this.nodes.length = target;

    if (!this.rafId) this.draw(0);
  };

  private createNode(): NeuralNode {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.15 + Math.random() * 0.25;
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      phase: Math.random() * Math.PI * 2,
    };
  }

  private move(dt: number): void {
    for (const node of this.nodes) {
      node.x += node.vx * dt * this.speedFactor;
      node.y += node.vy * dt * this.speedFactor;
      // Wrap from one edge to the other
      if (node.x < 0) node.x += this.width;
      else if (node.x > this.width) node.x -= this.width;
      if (node.y < 0) node.y += this.height;
      else if (node.y > this.height) node.y -= this.height;
    }
  }

  private draw(time: number): void {
    const { ctx, nodes, linkDistance, pointerDistance } = this;
    const pointer = this.reducedMotion ? null : this.pointer;
    ctx.clearRect(0, 0, this.width, this.height);

    // Edges: opacity proportional to proximity
    ctx.strokeStyle = this.edgeColor;
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < linkDistance) {
          ctx.globalAlpha = (1 - dist / linkDistance) * this.edgeFactor;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      if (pointer) {
        const dist = Math.hypot(a.x - pointer.x, a.y - pointer.y);
        if (dist < pointerDistance) {
          ctx.globalAlpha = 1 - dist / pointerDistance;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
      }
    }

    // Nodes: soft sin pulse, brighter near the pointer
    ctx.fillStyle = this.nodeColor;
    for (const node of nodes) {
      const pulse = 0.5 + 0.5 * Math.sin(time * 0.002 + node.phase);
      let boost = 0;
      if (pointer) {
        const dist = Math.hypot(node.x - pointer.x, node.y - pointer.y);
        if (dist < pointerDistance) boost = 1 - dist / pointerDistance;
      }
      ctx.globalAlpha = Math.min(1, 0.45 + pulse * 0.35 + boost * 0.5);
      ctx.beginPath();
      ctx.arc(node.x, node.y, 1.6 + pulse * 0.8 + boost * 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  private onPointerMove = (event: PointerEvent): void => {
    this.pointer = { x: event.clientX, y: event.clientY };
  };

  private onPointerLeave = (): void => {
    this.pointer = null;
  };

  private onVisibilityChange = (): void => {
    if (document.hidden) this.stop();
    else this.start();
  };

  private onMotionChange = (): void => this.start();
}
