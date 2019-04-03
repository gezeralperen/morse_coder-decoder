
    Morsedictionary = {
        '0': '-----',
        '1': '.----',
        '2': '..---',
        '3': '...--',
        '4': '....-',
        '5': '.....',
        '6': '-....',
        '7': '--...',
        '8': '---..',
        '9': '----.',
        'a': '.-',
        'b': '-...',
        'c': '-.-.',
        'd': '-..',
        'e': '.',
        'f': '..-.',
        'g': '--.',
        'h': '....',
        'i': '..',
        'j': '.---',
        'k': '-.-',
        'l': '.-..',
        'm': '--',
        'n': '-.',
        'o': '---',
        'p': '.--.',
        'q': '--.-',
        'r': '.-.',
        's': '...',
        't': '-',
        'u': '..-',
        'v': '...-',
        'w': '.--',
        'x': '-..-',
        'y': '-.--',
        'z': '--..',
        '.': '.-.-.-',
        ',': '--..--',
        '?': '..--..',
        '!': '-.-.--',
        '-': '-....-',
        '/': '-..-.',
        '@': '.--.-.',
        '(': '-.--.',
        ')': '-.--.-',
        ' ': '/'
    };

    function toMorse(text) {

        var morseCode = '';

        for (var i = 0; i < text.length; i++) {

            var textChar = text[i].toLowerCase()

            if(Morsedictionary[textChar] != undefined){
                morseCode += Morsedictionary[textChar];
            }

            if (textChar != ' ' && i != text.length - 1 && (text[i + 1] != ' ')) {
                morseCode += ' ';
            }

        }

        return morseCode;

    }
function swap(json){
  var ret = {};
  for(var key in json){
    ret[json[key]] = key;
  }
  return ret;
}

    function reverseMorse(text) {
        var toText = '';
        var currentmorse = '';
        var invmors = swap(Morsedictionary)

        for (var i = 0; i < text.length; i++) {
            if(text[i]== ' ' || i == text.length-1 || text[i] == '/'){
                if(i == text.length - 1){
                    currentmorse += text[i]
                }
                if(invmors[currentmorse] != undefined){
                    toText += invmors[currentmorse];
                }
                if(text[i] == '/'){
                    toText += " ";
                }
                currentmorse = '';
            }
            else{
                currentmorse += text[i];
            }

        }

        return toText;

    }

var vm = new Vue({
  el: '#convert',
  data: {
    message: '',
    latinin: '',
    out: 'Morse Code'
  },

  computed:{
    Morsed:{
      get: function () {
        return toMorse(this.message)
      }
    },

    ReverseMorsed:{
      get: function () {
        return reverseMorse(this.latinin)
      }
    }},

  methods: {
    applyMessage: function () {
      this.out = toMorse(this.message)
    }
  }
})

