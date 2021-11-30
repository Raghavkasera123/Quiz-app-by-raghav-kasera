
//header responsive menu

function headermenu() {
  const menu = document.querySelector(".js-header-menu"),
    backdrop = document.querySelector(".js-header-backdrop"),
    menucollapsebreakpoint = 991;

  function toggleMenu() {
    menu.classList.toggle("open");
    backdrop.classList.toggle("active");
    document.body.classList.toggle("overflow-hidden");
  }

  document.querySelectorAll(".js-header-menu-toggler").forEach((item) => {
    item.addEventListener("click", toggleMenu);
  });

  backdrop.addEventListener("click", toggleMenu);



  window.addEventListener("resize", function() {
    if(this.innerWidth > menucollapsebreakpoint && menu.classList.contains("open")){
      toggleMenu()
    }
  })

}


headermenu()

function styleSwitcherToggle() {
 
  const styleSwitcher = document.querySelector(".js-style-switcher"),
    styleSwitcherToggler = document.querySelector(".js-style-switcher-toggler");

  styleSwitcherToggler.addEventListener("click", function () {

    styleSwitcher.classList.toggle("open");
// Get the modal


  })
}

styleSwitcherToggle();

function LightDark() {
  const darkmodecheckbox = document.querySelector(".js-dark-mode");
  darkmodecheckbox.addEventListener("click", function () {
    if (this.checked) {
      localStorage.setItem("theme-dark", "true");
    } else {
      localStorage.setItem("theme-dark", "false");
    }
    themeMode()
  })

  function themeMode() {
    if (localStorage.getItem("theme-dark") === "false") {
      document.body.classList.remove("t-dark");
      document.body.style.backgroundColor = "white"
    } else {
      document.body.classList.add("t-dark");
      document.body.style.backgroundColor = "hsl(240, 10%, 19%)"
    }
  }

  if (localStorage.getItem("theme-dark") !== null) {
    themeMode()
  }

  if (document.body.classList.contains("t-dark")) {
    darkmodecheckbox.checked = true;
  }

}
LightDark()
