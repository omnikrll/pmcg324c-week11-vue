Vue.component('note-display', {
	props: ['title', 'body'],
	template: '\
		<div class="note">\
			<h2>{{ title }}</h2>\
			<p>{{ body }}</p>\
			<button v-on:click="$emit(\'remove\')">Remove Note</button>\
		</div>'
});


var app = new Vue({
	el: '#app',
	data: {
		title: '',
		body: '',
		notes: [],
		nextNoteId: 1
	},
	mounted() {
		if (localStorage.getItem('notes')) {
			try {
				this.notes = JSON.parse(localStorage.getItem('notes'));
									//storing lastNoteId in localStorage,
									//multiply by 1 to convert from string to number
				this.nextNoteId += (localStorage.getItem('lastNoteId') * 1);
			} catch(e) {
				localStorage.removeItem('notes');
				localStorage.removeItem('lastNoteId');
			}
		}
	},
	methods: {
		addNote: function() {
			//don't store anything if nothing is written
			if (!this.title.length || !this.body.length) {
				alert('please write something');
				return;
			}

			var newNote = {
				id: this.nextNoteId,
				title: this.title,
				body: this.body
			};

			this.notes.push(newNote);

			this.title = '';
			this.body = '';
			this.nextNoteId++;

						//pass number
			this.saveNotes(newNote.id);
		},
		deleteNote: function(index) {
			this.notes.splice(index, 1);

						//pass bool false
			this.saveNotes(false);
		},
		saveNotes: function(lastNoteId) {
			var _notes = JSON.stringify(this.notes);
			localStorage.setItem('notes', _notes);

			//if lastNoteId is not false, store it
			if (lastNoteId) {
				console.log(lastNoteId);
				localStorage.setItem('lastNoteId', lastNoteId);
			}
		}
	}
});