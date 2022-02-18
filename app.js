const main = document.querySelector('main')
const btnInsertText = document.querySelector('.btn-toggle')
const divTextBox = document.querySelector('.text-box')
const textRead = document.querySelector('#read')
const textArea = document.querySelector('textarea')
const closeDivTextBox = document.querySelector('.close')
const selectOption = document.querySelector('select')

const humanExpresions = [
	{img:'./img/drink.jpg', text:'Estoy con sed'},
	{img:'./img/food.jpg', text:'Estoy con ambre'},
	{img:'./img/tired.jpg', text:'Estoy con sed'},
	{img:'./img/hurt.jpg', text:'Estoy herido'},
	{img:'./img/happy.jpg', text:'Estoy feliz'},
	{img:'./img/angry.jpg', text:'Estoy enojado'},
	{img:'./img/sad.jpg', text:'Estoy tristre'},
	{img:'./img/scared.jpg', text:'Estoy asustado'},
	{img:'./img/outside.jpg', text:'Estoy afuera'},
	{img:'./img/home.jpg', text:'Estoy en casa'},
	{img:'./img/school.jpg', text:'Quiero ir a la escuela '},
	{img:'./img/grandma.jpg', text:'Quiero ver a la abuela'}
	]
	
	const utterance = new SpeechSynthesisUtterance() 
	
	const setTextMessage = text => {
		utterance.text = text
	}
	
	const speakTest = () => {
		speechSynthesis.speak(utterance)
	} 
	
	const setVoice = e => {
		const selectedVoice = voice => voice.name === event.target.value
		utterance.voice = voices.find(selectedVoice)		
	}
	
	const createExpressionBox =({img, text})=> {
		const div = document.createElement('div')
		div.classList.add('expression-box')
		div.innerHTML = `
		<img src="${img}" alt="${text}">
			<p class="info">${text}</p>`
		div.addEventListener('click', () => {
			setTextMessage(text)
			speakTest()
			
			div.classList.add('active')
			
			setTimeout(() => {
				div.classList.remove('active')
				
			}, 1000)
		})
		
		main.appendChild(div)
		
	}	
		
	humanExpresions.forEach(createExpressionBox)
	
	let voices = []
	
	speechSynthesis.addEventListener('voiceschanged', () => {
		voices = speechSynthesis.getVoices()
		
		const googleVoice = voices.find(voice => 
			voice.name === 'Google español de Estados Unidos'
		)
		
		const microsoftVoice = voices.find(voice => 
			voice.name === 'Microsoft Pablo - Spanish (Spain)'
		)
				
		voices.forEach(({name, lang}) => {
			
			const option = document.createElement('option')
			
			option.value = name
			
			if (googleVoice && option.value === googleVoice.name) {
				utterance.voice = googleVoice
				option.selected = true
			} else if (microsoftVoice && option.value === microsoftVoice.name) {
				utterance.voice = microsoftVoice
				option.selected = true
			}
			
			option.textContent = `${lang} | ${name}`
			
			selectOption.appendChild(option)	
						
		})
		
})
		
	btnInsertText.addEventListener('click', () => {
		divTextBox.classList.add('show')
	})
	
	closeDivTextBox.addEventListener('click', () => {
		divTextBox.classList.remove('show')
	})
	
	selectOption.addEventListener('change', setVoice)
	
	textRead.addEventListener('click', () => {
		console.log(textArea.value)
		setTextMessage(textArea.value)
		speakTest()
	})