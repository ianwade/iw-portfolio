new fullpage('#fullpage', {
  //options here
  autoScrolling:true,
  scrollHorizontally: true,
  licenseKey: 'gplv3-license',
  anchors:['landing', 'about', 'projects', 'contact'],
  onLeave: function(origin, destination, direction, trigger){
    console.log("scroll");

    console.log(destination);

    if(destination.anchor == "landing") {
      document.querySelector('nav').style.opacity = '0';
      document.querySelector('header').style.opacity = '0';
    }
    else {
      document.querySelector('nav').style.opacity = '1';
      document.querySelector('header').style.opacity = '1';
    }
  },
  credits: { enabled: false, label: 'Made with fullPage.js', position: 'right'},
});

document.querySelector('nav').style.opacity = '0';
document.querySelector('header').style.opacity = '0';

const items = document.querySelectorAll('.projects--item-full');

items.forEach(item => {
  item.addEventListener('click', () => {
    const item_contents = item.querySelector('.projects--item-contents');
    item_contents.style.height = (item_contents.style.height == '0px') ? '100%' : '0px';
    /*item_contents.style.display = (item_contents.style.display == 'none') ? 'block' : 'none';*/

    item.style.height = (item.style.height === '250px') ? '100%' : '250px';
  });
});

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
