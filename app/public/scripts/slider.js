const galleryContainer = document.querySelector(".gallery-container");
const galleryControlsContainer = document.querySelector(".gallery-controls");
const galleryControls = ["previous", "next"];
const galleryItems = document.querySelectorAll(".gallery-item");

class Carousel{

    constructor(container, items, controls){
        this.carouselContainer = container;
        this.carouselControls = controls;
        this.carouselArray = [...items];
        this.menuButton = null;
        this.createMenuButton();
    }

    createMenuButton(){
        this.menuButton = document.createElement("button");
        this.menuButton.className = "menu-button";
        this.menuButton.textContent = "Ir al Menú";
        this.menuButton.style.display = "none";
        this.menuButton.addEventListener("click", () => {
            window.location.href = "/menu";
        })
        this.carouselContainer.appendChild(this.menuButton);
    }

    updateGallery(){
        this.carouselArray.forEach(el => {
            el.classList.remove("gallery-item-1", "gallery-item-2", "gallery-item-3", "gallery-item-4", "gallery-item-5");
        });

        this.carouselArray.slice(0, 5).forEach((el, i) => {
            el.classList.add(`gallery-item-${i+1}`);
        });
        document.querySelector(`.gallery-item-2`).style.opacity="0.8";
        document.querySelector(`.gallery-item-3`).style.opacity="1";
        this.addHoverEffect();
    }

    setCurrentState(direction){
        if(direction.className == "gallery-controls-previous"){
            this.carouselArray.unshift(this.carouselArray.pop());
        }else{
            this.carouselArray.push(this.carouselArray.shift());
        }
        this.updateGallery();
    }

    setControls(){
        this.carouselControls.forEach(control => {
            galleryControlsContainer.appendChild(document.createElement("button")).className = `gallery-controls-${control}`;
            document.querySelector(`.gallery-controls-${control}`).innerText = control;
        })
    }

    useControls(){
        const triggers = [...galleryControlsContainer.childNodes];
        triggers.forEach(control => {
            control.addEventListener("click", e => {
                e.preventDefault();
                e.stopPropagation();
                this.setCurrentState(control);
            
            });
        });
    }

    addHoverEffect(){
        const mainImage = document.querySelector(".gallery-item-3");

        mainImage.parentElement.appendChild(this.menuButton);

        mainImage.addEventListener("mouseover", () => {
            this.menuButton.style.display = "block";
            mainImage.style.opacity = "0.8";
        });

        this.menuButton.addEventListener("mouseenter", () => {
            this.menuButton.style.display = "block";
            mainImage.style.opacity = "0.8";
        });

        mainImage.addEventListener("mouseleave", () => {
            this.menuButton.style.display = "none";
            mainImage.style.opacity = "1"
        })

        mainImage.addEventListener("touchsart", (e) => {
            e.preventDefault();
            this.menuButton.style.display = "block";
            setTimeout(() => {
                this.menuButton.style.display = "none";
            }, 3000);
        })
    }
}

const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

exampleCarousel.setControls();
exampleCarousel.useControls();
exampleCarousel.addHoverEffect();