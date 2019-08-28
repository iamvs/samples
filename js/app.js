let elementsPerPage = 6, // <-- You can select how many items will be displayed per page.
    dogs = 0,
    nojs = document.querySelectorAll('.nojs'),
    burgerIcon = '&#9776;',
    closeIcon  = '&#10006;';    

for ( let i = 0; i < nojs.length; i++ ) {
    nojs[i].classList.remove('nojs');
}


//Parsing Data
document.querySelector('#pets .wrap').innerHTML = 'Loading...';
const XHR = new XMLHttpRequest();
XHR.overrideMimeType('application/json');
XHR.open('GET', '/assets/data/dogs.json', true); 
XHR.onload = () => {
    if ( XHR.readyState == 4 && XHR.status === 200 ) {
        document.querySelector('#pets .wrap').innerHTML = '';
        let list = JSON.parse(XHR.response);
        dogs = list.dogs;
        showPets(1);
        createPagination(dogs.length);  
    } else {
        alert('Request failed.  Returned status of ' + XHR.status);
        document.querySelector('#pets .wrap').innerHTML = 'Currently our pets gallery unavailable. Please try again later.';
        document.querySelector('#gallery .intro').style.display = 'none';
        document.querySelector('#pagination').style.display = 'none';
    }
};
XHR.onerror = () => alert('The server is under maintenance, please visit us later...');
XHR.send();


//Hide Section
let hideSection = () => {
    let sections = document.querySelectorAll('#content .section');
    for ( let i = 0; i < sections.length; i++ ) {
        sections[i].style.display = 'none';
        sections[i].classList.remove('active');
    }
}
hideSection();


//Detect requsted page
if ( window.location.hash ) {
    document.querySelector(window.location.hash).classList.add('active');
    document.querySelector('a[href="' + window.location.hash + '"]').classList.add('active');
} else {
    document.querySelector('#gallery').classList.add('active');
    document.querySelector('a[href="#gallery"]').classList.add('active');
}          


//Show pets on a page
let showPets = page => {
    page = page - 1;

    if ( elementsPerPage > dogs.length ) {
        elementsPerPage = dogs.length;
    }

    for ( let i = elementsPerPage * page; i < elementsPerPage * page + elementsPerPage; i++ ) {
        if ( dogs.length !== i ) {
            if (dogs[i] !== undefined) {
                let pet = ` <div class="pet">
                                <div class="img" style="background-image: url(${dogs[i].image})"></div>
                                <h4 class="heading name">${dogs[i].name}</h4>
                            </div>`
                document.querySelector('#pets .wrap').innerHTML += pet;
            }
        }
    }  

    let items = document.getElementsByClassName('pet');

    for ( let i = 0; i < items.length; i++ ) {

        items[i].onclick = function() {
            modal.querySelector('.name').innerHTML = this.querySelector('.name').innerText;
            modal.querySelector('.modal-body').style.backgroundImage = this.querySelector('.img').style.getPropertyValue('background-image');
            modal.classList.toggle('show-modal');      
            document.querySelector('body').style.overflow = 'hidden';      
        }

    }
 

}


//Create a pagination
let createPagination = el => {
    let pages = Math.ceil(el/elementsPerPage),
        pagination = document.querySelector('#pagination ul');

    for ( let i = 1; i < pages; i++ ) {
        pagination.innerHTML += `<li>${i + 1}</li>`;
    }   
    createPagNavigation();
};


//Pag. Navigation
let createPagNavigation = () => {
    let pseudoLinks = pagination.getElementsByTagName('li');
    for ( let i = 0; i < pseudoLinks.length; i++ ) {
        pseudoLinks.item(i).addEventListener('click', function() {
            document.querySelector('#header').style.cssText = 'opacity: 1;';
            
            let activeLinks = pagination.getElementsByClassName('active');       

            while(activeLinks.length > 0){
                activeLinks[0].classList.remove('active');
            } 

            this.classList.add('active');

            document.querySelector('#pets .wrap').innerHTML = '';
            showPets(this.innerText);
        });
    }    
}


//Modal
let modal = document.querySelector('#modal'),
    closeButton = modal.querySelector('.close-button');

let toggleModal = () => {
    modal.classList.toggle('show-modal');
    document.querySelector('body').style.overflow = '';
} 
let windowOnClick = (event) => (event.target === modal) ? toggleModal() : '';

closeButton.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);


//Switch Page
let menuItems = document.querySelectorAll('#header nav .nav-link');

for (var i = 0; i < menuItems.length; i++) {    
    menuItems[i].addEventListener('click', function(e) {

        if ( document.querySelector('#header nav .nav-link.active') ) {
            document.querySelector('#header nav .nav-link.active').classList.remove('active');
        }
        
        this.classList.add('active');

        hideSection();
        
        let sectionID = this.getAttribute('href').replace('#','');
        document.getElementById(sectionID).classList.add('active');

    });
}

//Reset Mobile Menu Button
let resetMobileMenuBtn = () => {
    document.querySelector('#header nav.nav').classList.remove('open');
    document.querySelector('#mobile-menu').className = '';
    document.querySelector('#mobile-menu .icon').innerHTML = burgerIcon;    
}

//Mobile menu
document.querySelector('#mobile-menu').onclick = function(e) {

    document.querySelector('#header').style.cssText = 'opacity: 1;';

    this.classList.toggle('opened');

    if ( this.classList.contains('opened') ) {
        this.firstChild.innerHTML = closeIcon;
    } else {
        this.firstChild.innerHTML = burgerIcon;
    }
    document.querySelector('#header nav.nav').classList.toggle('open');

    let mobileMenuItems = document.querySelectorAll('#header nav.nav.open a.nav-link');
    for ( let i = 0; i < mobileMenuItems.length; i++ ) {
        mobileMenuItems[i].onclick = () => { 
            if ( document.querySelector('#header nav.nav.open') ) {
                document.querySelector('#header nav.nav.open').classList.remove('open');
            }
            this.firstChild.innerHTML = burgerIcon;
        }
    }    

    e.stopPropagation();

    document.querySelector('body').onclick = () => {
        resetMobileMenuBtn();
    }
}

//Detect resizing of a window
window.addEventListener('resize', () => {
    resetMobileMenuBtn();
});


//Hide Header
window.onscroll = function(e) {
    resetMobileMenuBtn();
    if ( this.oldScroll > this.scrollY ) {
        if (window.pageYOffset > 0) {
            document.querySelector('#header').style.cssText = 'opacity: 1;';
        }        
    } else {
        document.querySelector('#header').style.cssText = 'opacity: 0; z-index: -999;';
    }
    this.oldScroll = this.scrollY;
}