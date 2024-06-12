(() => {
    "use strict";

    console.log("hello");
    
    document.querySelector(".testButton").addEventListener('click', handleClick);
    
    function handleClick() {
        console.log("test button was clicked");
    }
})();