export const start_index = 43; // START TAB INDEX IN TABLE (THIS IS THE INPUT COUNT BEFORE TABLES)
export const focusNextInput = (currentIndex:number) =>{
    const index = `[tabIndex="${currentIndex + 1}"]`;
    const element = document.querySelector(index) as HTMLElement;
    if (element) {
      element.focus();
    }
}