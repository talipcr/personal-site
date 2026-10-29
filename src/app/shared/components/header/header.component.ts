import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { animate, hover, inView, scroll, stagger } from 'motion';
import { LANGUAGES } from 'src/app/app.component';
import { skillsData } from 'src/app/shared/mock/data';
import {
  canHover,
  duration,
  easeOutExpo,
  enter,
  fadeUp,
  prefersReducedMotion,
  scaleIn,
  springSoft,
  springUi,
} from 'src/app/shared/motion/motion.tokens';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  name = 'Talip Cesur';
  link = [
    {
      name: 'github',
      href: 'https://github.com/talipcr',
    },
    {
      name: 'linkedin',
      href: 'https://www.linkedin.com/in/talipcesur/',
    },
    {
      name: 'stackblitz',
      href: 'https://stackblitz.com/@talipcr',
    },
    {
      name: 'email',
      href: 'mailto:talip.cesur@gmail.com',
    },
  ];
  github = this.link[0];
  linkedin = this.link[1];
  secondaryLinks = this.link.slice(2);
  lang = LANGUAGES;
  nameChars = Array.from(this.name).map((char) => (char === ' ' ? ' ' : char));
  tags = skillsData.flatMap((skill) => skill.description.slice(0, 2));
  sections = [
    { id: 'about', label: 'HOME.ABOUT' },
    { id: 'projects', label: 'HOME.PROJECTS' },
    { id: 'posts', label: 'HOME.POSTS' },
    { id: 'experience', label: 'HOME.EXPERIENCE' },
    { id: 'certifications', label: 'HOME.CERTIFICATIONS' },
    { id: 'education', label: 'HOME.EDUCATION' },
    { id: 'skills', label: 'HOME.SKILLS' },
  ];
  // Simple Icons (CC0) + a stroked envelope
  icons: Record<string, string> = {
    github:
      'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
    linkedin:
      'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    stackblitz: 'M10.797 14.182H3.635L16.728 0l-3.525 9.818h7.162L7.272 24l3.524-9.818Z',
    email: 'M3.5 5.5h17v13h-17z M3.5 6.5l8.5 6.5 8.5-6.5',
  };
  activeSection = '';
  menuOpen = false;

  @ViewChild('nav', { static: true }) private navRef!: ElementRef<HTMLElement>;
  @ViewChild('navBg', { static: true }) private navBgRef!: ElementRef<HTMLElement>;
  @ViewChild('indicator', { static: true }) private indicatorRef!: ElementRef<HTMLElement>;
  @ViewChild('menu', { static: true }) private menuRef!: ElementRef<HTMLElement>;
  @ViewChild('hero', { static: true }) private heroRef!: ElementRef<HTMLElement>;
  @ViewChild('count', { static: true }) private countRef!: ElementRef<HTMLElement>;
  @ViewChildren('navLink') private navLinks!: QueryList<ElementRef<HTMLAnchorElement>>;

  private observer?: IntersectionObserver;
  private cleanups: VoidFunction[] = [];
  private navHidden = false;

  constructor(
    public translate: TranslateService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.playIntro();
      this.watchScroll();
      this.bindIconHover();
      const onResize = () => this.moveIndicator(false);
      window.addEventListener('resize', onResize, { passive: true });
      this.cleanups.push(() => window.removeEventListener('resize', onResize));
    });

    // Label widths change with the language
    const langSub = this.translate.onLangChange.subscribe(() =>
      setTimeout(() => this.moveIndicator(false))
    );
    this.cleanups.push(() => langSub.unsubscribe());

    // Sections render in the sibling router-outlet: wait one tick
    setTimeout(() => this.observeSections());
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.cleanups.forEach((cleanup) => cleanup());
  }

  public switchLang(lang: string): void {
    this.translate.use(lang);
  }

  public showNav(): void {
    this.setNavHidden(false);
  }

  public toggleMenu(): void {
    if (this.menuOpen) this.closeMenu();
    else this.openMenu();
  }

  public closeMenu(): void {
    if (!this.menuOpen) return;
    const menu = this.menuRef.nativeElement;
    animate(menu, { opacity: 0, y: -12 }, { duration: duration.fast, ease: easeOutExpo }).then(
      () => this.zone.run(() => (this.menuOpen = false))
    );
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  private openMenu(): void {
    this.menuOpen = true;
    this.cdr.detectChanges(); // render the panel before animating it
    const menu = this.menuRef.nativeElement;
    const items = Array.from(menu.querySelectorAll<HTMLElement>('.mobile-menu-item'));
    enter(menu, { opacity: [0, 1], y: [-12, 0] }, { duration: duration.fast });
    enter(items, fadeUp, { delay: stagger(0.04, { startDelay: 0.05 }) });
  }

  /** Loading sequence: name letter by letter, title, pills, then meta and CTAs. */
  private playIntro(): void {
    const hero = this.heroRef.nativeElement;
    const all = (selector: string) => Array.from(hero.querySelectorAll<HTMLElement>(selector));
    const avatar = all('.hero-avatar');
    const letters = all('.hero-letter');
    const texts = all('.hero-title, .hero-description');
    const pills = all('.hero-tags .pill');
    const outro = [...all('.hero-actions > *'), ...all('.hero-meta')];

    // Hidden by JS right before animating: content stays visible if Motion fails
    [...avatar, ...letters, ...texts, ...pills, ...outro].forEach((el) => (el.style.opacity = '0'));

    const textsAt = 0.2 + letters.length * 0.03 + 0.15;
    const pillsAt = textsAt + 0.3;
    const outroAt = pillsAt + pills.length * 0.04 + 0.1;

    enter(avatar, scaleIn, springSoft);
    enter(
      letters,
      { ...fadeUp, filter: ['blur(8px)', 'blur(0px)'] },
      { delay: stagger(0.03, { startDelay: 0.2 }) }
    );
    enter(texts, fadeUp, { delay: stagger(0.1, { startDelay: textsAt }) });
    enter(pills, scaleIn, { ...springUi, delay: stagger(0.04, { startDelay: pillsAt }) });
    enter(outro, fadeUp, { delay: stagger(0.06, { startDelay: outroAt }) });

    this.countUp(outroAt);
  }

  private countUp(delay: number): void {
    if (prefersReducedMotion()) return;
    const el = this.countRef.nativeElement;
    const target = Number(el.textContent) || 0;
    el.textContent = '0';
    inView(el, () => {
      animate(0, target, {
        delay,
        duration: duration.slow * 1.5,
        ease: easeOutExpo,
        onUpdate: (value) => (el.textContent = String(Math.round(value))),
      });
    });
  }

  /** Hide on scroll down, show on scroll up; denser background after 40px. */
  private watchScroll(): void {
    const navBg = this.navBgRef.nativeElement;
    let lastY = window.scrollY;
    let solid = false;

    this.cleanups.push(
      scroll((_progress: number, info) => {
        const y = info.y.current;

        if (y > 40 !== solid) {
          solid = y > 40;
          animate(navBg, { opacity: solid ? 1 : 0 }, { duration: duration.fast });
        }

        const delta = y - lastY;
        if (Math.abs(delta) < 6) return;
        lastY = y;
        if (!prefersReducedMotion()) {
          this.setNavHidden(delta > 0 && y > 120 && !this.menuOpen);
        }
      })
    );
  }

  private setNavHidden(hidden: boolean): void {
    if (hidden === this.navHidden) return;
    this.navHidden = hidden;
    animate(this.navRef.nativeElement, { y: hidden ? '-100%' : '0%' }, springUi);
  }

  /** Single gradient bar sliding between nav links (layoutId equivalent). */
  private moveIndicator(animated = true): void {
    const indicator = this.indicatorRef.nativeElement;
    const link = this.navLinks
      ?.map((ref) => ref.nativeElement)
      .find((el) => el.hash === `#${this.activeSection}`);

    // offsetParent is null while the desktop links are hidden (mobile)
    if (!link || !link.offsetParent) {
      indicator.style.opacity = '0';
      return;
    }
    const target = { x: link.offsetLeft, scaleX: link.offsetWidth / 100, opacity: 1 };
    animate(indicator, target, animated && !prefersReducedMotion() ? springUi : { duration: 0 });
  }

  private bindIconHover(): void {
    if (!canHover() || prefersReducedMotion()) return;
    const links = Array.from(this.heroRef.nativeElement.querySelectorAll<HTMLElement>('.social-link'));
    this.cleanups.push(
      hover(links, (link) => {
        const icon = link.querySelector('.social-icon');
        if (!icon) return;
        animate(icon, { rotate: -12, scale: 1.15 }, springUi);
        return () => animate(icon, { rotate: 0, scale: 1 }, springUi);
      })
    );
  }

  private observeSections(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          this.zone.run(() => (this.activeSection = visible.target.id));
          this.zone.runOutsideAngular(() => this.moveIndicator());
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    this.sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) this.observer?.observe(el);
    });
  }
}
