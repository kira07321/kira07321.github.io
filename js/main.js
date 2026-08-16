/* ============================================================
   个人主页交互脚本
   修改邮箱等配置：改下面的 SITE_CONFIG
   ============================================================ */

const SITE_CONFIG = {
  // 联系表单发送到哪个邮箱
  email: "you@example.com",
  name: "你的名字",
};

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileNav();
  initTyping();
  initReveal();
  initSkillBars();
  initCounters();
  initNavbar();
  initBackTop();
  initContactForm();
  setYear();
});

/* ---------- 深色模式 ---------- */
function initTheme() {
  const toggle = document.getElementById("themeToggle");
  const saved = localStorage.getItem("site-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  applyTheme(theme);

  toggle.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("site-theme", next);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const toggle = document.getElementById("themeToggle");
  toggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

/* ---------- 移动端菜单 ---------- */
function initMobileNav() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  // 点击菜单链接后自动收起
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- 打字机效果 ---------- */
function initTyping() {
  const el = document.getElementById("typedText");
  if (!el) return;
  const text = el.getAttribute("data-text") || "";
  let index = 0;

  function type() {
    if (index <= text.length) {
      el.textContent = text.slice(0, index);
      index++;
      setTimeout(type, 70);
    }
  }
  type();
}

/* ---------- 滚动显现 ---------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------- 技能条动画 ---------- */
function initSkillBars() {
  const fills = document.querySelectorAll(".skill-fill");
  if (!("IntersectionObserver" in window)) {
    fills.forEach((bar) => (bar.style.width = bar.getAttribute("data-width")));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.width = bar.getAttribute("data-width");
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.4 }
  );

  fills.forEach((bar) => observer.observe(bar));
}

/* ---------- 数字滚动 ---------- */
function initCounters() {
  const nums = document.querySelectorAll("[data-count]");
  if (!nums.length) return;

  const animate = (el) => {
    const target = parseInt(el.getAttribute("data-count"), 10);
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased).toLocaleString("zh-CN");
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if (!("IntersectionObserver" in window)) {
    nums.forEach(animate);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  nums.forEach((el) => observer.observe(el));
}

/* ---------- 导航栏状态与高亮 ---------- */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const links = document.querySelectorAll(".nav-menu a");

  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 10);

    // 高亮当前区块对应的导航项
    let current = "home";
    const sections = document.querySelectorAll("main section[id]");
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.id;
      }
    });
    links.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------- 回到顶部 ---------- */
function initBackTop() {
  const btn = document.getElementById("backTop");
  window.addEventListener(
    "scroll",
    () => {
      btn.classList.toggle("show", window.scrollY > 500);
    },
    { passive: true }
  );
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ---------- 联系表单 ---------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const tip = document.getElementById("formTip");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("formName").value.trim();
    const email = document.getElementById("formEmail").value.trim();
    const message = document.getElementById("formMessage").value.trim();

    if (!name || !email || !message) {
      tip.textContent = "请把信息填写完整哦～";
      return;
    }

    if (SITE_CONFIG.email === "you@example.com") {
      tip.textContent = "提示：先在 js/main.js 里把 SITE_CONFIG.email 改成你的真实邮箱，表单才会真正发出邮件。";
      return;
    }

    const subject = encodeURIComponent(`来自 ${name} 的留言`);
    const body = encodeURIComponent(`${message}\n\n—— ${name}（${email}）`);
    window.location.href = `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`;
    tip.textContent = "已为你打开邮件客户端，点发送即可～";
    form.reset();
  });
}

/* ---------- 页脚年份 ---------- */
function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}
