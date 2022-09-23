export const resetSidebarColors = () => {
    const otherItems = document.querySelectorAll(".item-link__clicked");
    if (otherItems.length > 0) {
        otherItems.forEach((oI) => {
            oI.classList.remove("item-link__clicked");
        });
    }
};
