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
            abbr: t.abbreviation,
            logo: getLogo(t.abbreviation, t.name)
        }
    })

    teams = refined
};


function getLogo(abbrv, name){

    let imgStr = ''
    // 30 teams played nice here, however:
    if (abbrv === 'MTL') {
        // the 'é' in 'Montréal' is an edge case
        imgStr = 'montreal-canadiens'
    } else if (abbrv === 'STL') {
        // the '.' in 'St. Louis' is an edge case
        imgStr = 'st-louis-blues'
    } else {
        // the rest I can just plug into the url with some string manipulation
        imgStr = name.toLowerCase().split(' ').join('-')
    }
    return `https://loodibee.com/wp-content/uploads/nhl-${imgStr}-logo-480x480.png`
}




(async () => {
    const main = document.querySelector('main')
    const input = document.querySelector('input')

    // once fired, `teams` variable is globally available
    await getTeams()
    
    teams.forEach(t => {

        // 1. Create wrapper for team
        const cell = document.createElement('div')
        cell.setAttribute('class', `cell hidden ${t.abbr}`)


        // 2. Create space for logo
        const logoWrapper = document.createElement('div')
        logoWrapper.setAttribute('class', 'logoWrap fcc')
        const logo = document.createElement('img')
        logo.setAttribute('src', t.logo)
        logoWrapper.appendChild(logo)
        cell.appendChild(logoWrapper)

        // 3. Create space for name
        const text = document.createElement('div')
        text.setAttribute('class', 'nameText fcc')
        text.innerText = t.fullName
        cell.appendChild(text)

        // 4. Append all that good stuff to the main
        main.append(cell)
    })




    input.addEventListener('change', (e) => {

    })

})()


