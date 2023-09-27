console.log('No, I didn\'t log the answers here, but if you\'re really that stuck, go inspect the elements');
let teams
let guessed = []

async function getTeams(){
    const response = await fetch('https://statsapi.web.nhl.com/api/v1/teams')
    const data = await response.json()
    const refined = data.teams.map(t => {
        return {
            fullName: t.name,
            city: t.locationName.toLowerCase(),
            nickname: t.teamName.toLowerCase(),
            abbr: t.abbreviation,
            id: t.id,
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
    const counter = document.querySelector('.counter')
    counter.innerText = `${guessed.length}/32`
    // once fired, `teams` variable is globally available
    await getTeams()
    
    teams.forEach(t => {

        // 1. Create wrapper for team
        const cell = document.createElement('div')
        cell.setAttribute('class', `cell hidden t${t.id}`)


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




    input.addEventListener('keyup', (e) => {
        const match = teams.find(team => team.nickname === e.target.value.toLowerCase())
        if (match) {
            // if it's already guessed, ignore it
            if (guessed.includes(match.nickname)) return

            const cell = document.querySelector(`.t${match.id}`)
            cell.classList.remove('hidden')
            cell.classList.add('correct') // this will do a flashy green thing
            input.value = ''
            guessed.push(match.nickname) // adds to list to enable above check
            counter.innerText = `${guessed.length} / 32`


            if (guessed.length === 1) {
                input.disabled = true
                input.removeEventListener('keyup')
                document.querySelectorAll('.cell').forEach(cell => classList.add('correct'))
                window.alert('You win!')
            }
        }
        
    })

})()


