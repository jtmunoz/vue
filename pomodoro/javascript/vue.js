const POMODORO_STATES = {
	WORK = 'work',
	REST = 'rest'
};

const WORKING_TIME_LENGTH_IN_MINUTES = 25;
const RESTING_TIME_LENGTH_IN_MINUTES = 5;

new Vue ({
	el: '#app',
	data: {
		minute: WORKING_TIME_LENGTH_IN_MINUTES,
		second: 0,
		pomodoroState: POMODORO_STATES.WORK,
		timestamp: 0
	},
	methods: {
		start: function () {
			this.tick();
			this.interval = setInterval(this._tick, 1000);
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