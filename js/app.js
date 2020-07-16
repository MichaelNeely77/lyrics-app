import { API } from './api.js';
import * as UI from './ui.js';

UI.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const artistName = UI.artistInput.value,
        songName = UI.songInput.value;

    if(artistName === '' || songName === '') {
        UI.messageDiv.innerHTML = 'Error... All fields must be filled out.';
        UI.messageDiv.classList.add('error');
        setTimeout(() => {
            UI.messageDiv.innerHTML = '';
            UI.messageDiv.classList.remove('error');
        }, 3000)
    } else {
        // query the API
        const lyric = new API(artistName, songName);
        lyric.queryAPI()
            .then(data => {
                if(data.lyric.lyrics) {
                    let result = data.lyric.lyrics;
                    UI.resultDiv.textContent = result;
                } else {
                    UI.messageDiv.innerHTML = 'No results found.';
                    UI.messageDiv.classList.add('error');
                    setTimeout(() => {
                        UI.messageDiv.innerHTML = '';
                        UI.messageDiv.classList.remove('error');
                        UI.searchForm.reset();
                    }, 3000)
                }
                
            })
        
    }
});