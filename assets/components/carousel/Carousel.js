import { GetComponent } from "../../js/GetComponent.js";
let CurrentChild = 0;

export default async function Carousel(SelectedElementID, ItemIDs = []) {
    const CarouselContainer = await GetComponent(
        "./assets/components/carousel/Carousel.html",
        SelectedElementID,
    );

    const Carousel = CarouselContainer.querySelector("#carousel");
    const LeftButton = CarouselContainer.querySelector("#left");
    const RightButton = CarouselContainer.querySelector("#right");

    ItemIDs.forEach((ItemID) =>{
        const SelectedElement = document.getElementById(ItemID);
        console.log(SelectedElement);
        if (SelectedElement){
            const ListElement = Carousel.appendChild(document.createElement('li'));
            ListElement.dataset.index = Carousel.children.length;
            ListElement.insertBefore(SelectedElement, ListElement.lastChild);
        }
    });

    RightButton.addEventListener("click", (Event) =>{
        CurrentChild++;
        if (CurrentChild > Carousel.children.length){
            CurrentChild = 0;
        }
        Carousel.children[CurrentChild].scrollIntoView();
    });

    LeftButton.addEventListener("click", (Event) =>{
        CurrentChild--;
        if (CurrentChild < 0){
            CurrentChild = Carousel.children.length - 1;
        }
        Carousel.children[CurrentChild].scrollIntoView();
    });
};