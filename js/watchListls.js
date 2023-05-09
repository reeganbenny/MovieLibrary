

export function saveWatchList(imdbId){
    console.log("Saving to local Storage "+imdbId);
    let watchList;
    if(localStorage.getItem('watchList') == null){
        watchList = [];
    }else {
        watchList = JSON.parse(localStorage.getItem('watchList'));
    }

    watchList.push(imdbId);
    localStorage.setItem('watchList', JSON.stringify(watchList));
}


export function getAllWatchList(){
    let watchList;
    if (localStorage.getItem('watchList') == null) {
        watchList = [];
    }
    else {
        watchList = JSON.parse(localStorage.getItem('watchList'));
    }
    return watchList;
}

export function findWatchList(imdbId){
    
    let watchList;
    if(localStorage.getItem('watchList') == null){
        watchList = [];
    }else {
        watchList = JSON.parse(localStorage.getItem('watchList'));
    }
    console.log("Search "+watchList.includes(imdbId)+" in local storage" );
    return watchList.includes(imdbId)
}



export function removeWatchList(imdbId) {
    console.log("Remove from local Storage "+imdbId);
    let watchList;
    if (localStorage.getItem('watchList') == null) {
        watchList = [];
    }
    else {
        watchList = JSON.parse(localStorage.getItem('watchList'));
    };
    let watchListIndex;
    let i=0;
    watchList.forEach(id =>{
        if(id == imdbId){
            watchListIndex = i;
        }
        i++;
    });
    watchList.splice(watchListIndex, 1);
    localStorage.setItem('watchList', JSON.stringify(watchList));
}

