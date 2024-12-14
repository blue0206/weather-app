const LoadingComponent = function() {
    const loadingModal = document.querySelector(".loading-modal");
    
    function show() {
        loadingModal.showModal();
    }

    function hide() {
        loadingModal.close();
    }

    return { show, hide };
}();

export { LoadingComponent };