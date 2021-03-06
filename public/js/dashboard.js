function showDashboard() {
    let $mainContent = $('#mainContent');
    let baseUrl = window.location.origin;
    setActive("Dashboard");
    $.get(baseUrl + "/dashboard").done((response) => {
        $mainContent.replaceWith(response);
    })
};

function showFoodList() {
    let $mainContent = $('#mainContent');
    let baseUrl = window.location.origin;
    setActive("FoodList");
    $.get(baseUrl + "/foodOverView").done((response) => {
        $mainContent.replaceWith(response);
        foodOverView.showList();
    });
};

function showUsers() {
    let $mainContent = $('#mainContent');
    let baseUrl = window.location.origin;
    setActive("Users");
    $.get(baseUrl + "/userOverview").done((response) => {
        $mainContent.replaceWith(response);
        UserOverview.loadData();
    })
};

function showDisaster() {
    let $mainContent = $('#mainContent');
    let baseUrl = window.location.origin;
    setActive("DisasterSituation");
    $.get(baseUrl + "/disaster").done((response) => {
        $mainContent.replaceWith(response);
    })
};

function setActive(activeTab) {
    $(".tabPoint").removeClass("active");
    hideNavbar();

    if (activeTab === "Dashboard") {
        $("#liDashboard").addClass("active");
    } else if (activeTab === "FoodList") {
        $("#liFoodList").addClass("active");
    } else if (activeTab === "Users") {
        $("#liUsers").addClass("active");
    } else if (activeTab === "DisasterSituation") {
        $("#liDisasterSituation").addClass("active");
    }
    initFloats();
}

