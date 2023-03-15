console.log('hello');
let teams


async function getTeams(){
    const response = await fetch('https://statsapi.web.nhl.com/api/v1/teams')
    const data = await response.json()
    const refined = data.teams.map(t => {
        return {
            fullName: t.name,
            city: t.locationName,
            nickname: t.teamName,
            logo: getLogo(t.abbreviation, t.name)
        }
    })

    teams = refined
};


function getLogo(abbrv, name){
    let imgStr = ''
    if (abbrv === 'MTL') {
        console.log('MONTREAL!!!!')
        imgStr = 'montreal-canadiens'
        console.log(imgStr)
    } else if (abbrv === 'STL') {
        console.log('ST LOUIS')
        imgStr = 'st-louis-blues'
        console.log(imgStr)
    } else {
        imgStr = name.toLowerCase().split(' ').join('-')

    }
    return `https://loodibee.com/wp-content/uploads/nhl-${imgStr}-logo-480x480.png`
}




(async () => {
    const main = document.querySelector('main')
    await getTeams()
    
    console.log(teams)

    // const logoStr = `https://loodibee.com/wp-content/uploads/nhl-${imgStr}-logo-480x480.png`

    // teams.forEach(team => {

    // })

    // console.log(teams)
})()


