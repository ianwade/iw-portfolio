new fullpage('#fullpage', {
  //options here
  autoScrolling:true,
  scrollHorizontally: true,
  licenseKey: 'gplv3-license',
  anchors:['landing', 'about', 'projects', 'contact'],
  scrollBar: false,
  scrollHorizontally: false,
  css3: true,
  scrollingSpeed: 800,
  easingcss3: 'cubic-bezier(0.33, 1, 0.2, 1)',
  // Accessibility
  keyboardScrolling: true,
  animateAnchor: true,
  recordHistory: true,
  onLeave: function(origin, destination, direction, trigger){
    
    if(destination.anchor == "landing") {
      document.querySelector('nav').style.opacity = '0';
      document.querySelector('header').style.opacity = '0';
    }
    else {
      document.querySelector('nav').style.opacity = '1';
      document.querySelector('header').style.opacity = '1';
    }

    let nav_highlight = "nav--" + destination.anchor;
    let nav_unhighlight = "nav--" + origin.anchor;

    document.getElementById(nav_highlight).style.opacity = '100%';
    document.getElementById(nav_unhighlight).style.opacity = '25%';
  },
  credits: { enabled: false, label: 'Made with fullPage.js', position: 'right'},
});

const projects = document.querySelectorAll('.projects--item-full');

projects.forEach(project => {
  const project_contents = project.querySelector('.projects--item-contents');

  project.querySelectorAll('.projects--item-thumbnail').forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
      toggle_project(project_contents);
    });
  });

  project.querySelectorAll('.projects--closer').forEach(closer => {
    closer.addEventListener('click', () => {
      toggle_project(project_contents);
    });
  });
});

/*closers.forEach(item => {
  item.addEventListener('click', toggle_project(this))
});*/

function toggle_project(item_contents) {
  
    item_contents.style.height = (item_contents.style.height == '0px') ? '100%' : '0px';
    item_contents.style.display = (item_contents.style.display == 'none') ? 'block' : 'none';
}

function navigateToSection(sectionId) {
  const section = document.getElementById(sectionId);
  const headerHeight = 125; // Adjust this value based on your header's height

  if (section) {

    console.log(sectionId);
    const sectionPosition = section.getBoundingClientRect().top;
    const offsetPosition = sectionPosition - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

$(document).ready(function () {
  $(".projects--filter").scrollspy({ offset: -25 });
});

