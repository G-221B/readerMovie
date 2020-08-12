export function formatMovieData (list) {
    const newList = []
    for (let i = 0; i < list.length; i++) {
        let subTitle = list[i].title
        if (subTitle.length > 6) {
            subTitle = subTitle.substring(0, 6) + '...'
        }
        const movie = {
            id: list[i].id,
            subTitle: subTitle || list[i].title,
            img: list[i].images.large,
            starts: formatStarts(list[i].rating.stars.substring(0, 1)),
            average: list[i].rating.average
        }
        newList.push(movie)
    }
    return newList
}
export function formatStarts (starts) {
    const startArr = []
    for (let i = 0; i < 5; i++) {
        if (starts > i) {
            startArr.push(1)
        } else {
            startArr.push(0)
        }
    }
    return startArr
}
export function convertToCastString (casts) {
    var castsjoin = "";
    for (var idx in casts) {
        castsjoin = castsjoin + casts[idx].name + " / ";
    }
    return castsjoin.substring(0, castsjoin.length - 2);
}

export function convertToCastInfos (casts) {
    var castsArray = []
    for (var idx in casts) {
        var cast = {
            img: casts[idx].avatars ? casts[idx].avatars.large : "",
            name: casts[idx].name
        }
        castsArray.push(cast);
    }
    return castsArray;
}