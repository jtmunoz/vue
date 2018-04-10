const POMODORO_STATES = {
	WORK: 'work',
	REST: 'rest'
};

const STATES = {
	STARTED: 'started',
	STOPPED: 'stopped',
	PAUSED: 'paused'
};

const WORKING_TIME_LENGTH_IN_MINUTES = 25;
const RESTING_TIME_LENGTH_IN_MINUTES = 5;

const AXIOS = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

const API_KEY = 'z7cfnpBE4iysIKZZG7R12ulGMAREo1P0'

new Vue ({
	el: '#app',
	data: {
		state: STATES.STOPPED,
		minute: WORKING_TIME_LENGTH_IN_MINUTES,
		second: 0,
		pomodoroState: POMODORO_STATES.WORK,
		timestamp: 0,
    gifs: [],
    loading: false,
    gifTotal: 0

	},
	computed: {
		title: function () {
			return this.pomodoroState === POMODORO_STATES.WORK ? 'Work!' : 'Rest!'
		},
		min: function () {
			if (this.minute < 10){
				return '0' + this.minute;
			}
			return this.minute;
		},
		sec: function () {
			if (this.second < 10){
				return '0' + this.second;
			}
			return this.second;
		}
	},
	methods: {
		getGifs: function () {
      this.loading = true;
      axios.get("https://api.giphy.com/v1/gifs/random?api_key=z7cfnpBE4iysIKZZG7R12ulGMAREo1P0&tag=&rating=G")
      .then((response)  =>  {
        this.loading = false;
        this.gifs = response.data.data.embed_url;
        this.gifTotal ++;
        console.log(response.data.data.url)
      }, (error)  =>  {
        this.loading = false;
      })
    },
		start: function () {
			this.state = STATES.STARTED
			this._tick();
			this.interval = setInterval(this._tick, 1000);
			this.gifInterval = setInterval(this.getGifs, 3000)
		},
		pause: function () {
			this.state = STATES.PAUSED;
			clearInterval(this.interval);
			clearInterval(this.gifInterval);
		},
		stop: function () {
			this.state = STATES.STOPPED;
			clearInterval(this.interval);
			this.pomodoroState = POMODORO_STATES.WORK;
			this.minute = WORKING_TIME_LENGTH_IN_MINUTES
			this.second = 0;
			clearInterval(this.gifInterval);
			this.gifTotal = 0;
		},
		_tick: function () {
			if (this.second !== 0) {
				this.second--;
				return;
			}
			if (this.minute !== 0) {
				this.minute--;
				this.second = 59;
				return;
			}
			
			this.pomodoroState = this.pomodoroState === POMODORO_STATES.WORK ? POMODORO_STATES.REST : POMODORO_STATES.WORK;

			if (this.pomodoroState === POMODORO_STATES.WORK) {
				this.minute = WORKING_TIME_LENGTH_IN_MINUTES;
			} else {
				this.minute = RESTING_TIME_LENGTH_IN_MINUTES;
			}
		}
	}
})