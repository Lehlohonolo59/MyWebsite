function scrollToElement(elementSelector, instance = 0){
    //Select all elements that match given selector
    const elements = document.querySelectorAll(elementSelector);
    //Check if there are elements matching the selector and if the requeseted instance exists
    if(elements.length > instance){
        //Scoll to specified instance of the element
        elements[instance].scrollIntoView({ behavior: 'smooth'});
    }
}

const link1 = document.getElementById("link1");
const link2 = document.getElementById("link2");
const link3 = document.getElementById("link3");
const link4 = document.getElementById("link4");

link1.addEventListener('click', () =>{
    scrollToElement('.content');
} )

link2.addEventListener('click', () =>{
    scrollToElement('.Skill');
} )

link3.addEventListener('click', () =>{
    scrollToElement('.training');
} )

link4.addEventListener('click', () =>{
    scrollToElement('.column');
} )