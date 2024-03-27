window.addEventListener('load', function () {

  let pokemonButton = document.getElementById('pokemonget');
  let pokemonToLeftButton = document.getElementById('placeleft');
  let pokemonToRightButton = document.getElementById('placeright');
  let scaleArm = document.getElementById('scalearm');
  let leftScale = document.getElementById('scaleleft');
  let rightScale = document.getElementById('scaleright');

  //Scale left image position pointers
  let pokeLeftOne = document.getElementById('pokeleftone');
  let pokeLeftTwo = document.getElementById('pokelefttwo');
  let pokeLeftThree = document.getElementById('pokeleftthree');
  let pokeLeftFour = document.getElementById('pokeleftfour');

  //Scale right image position pointers
  let pokeRightOne = document.getElementById('pokerightone');
  let pokeRightTwo = document.getElementById('pokerighttwo');
  let pokeRightThree = document.getElementById('pokerightthree');
  let pokeRightFour = document.getElementById('pokerightfour');

  //Handlers for active searched pokemon
  let pokemonName = document.getElementById('pokemonName');
  let pokemonWeight = document.getElementById('pokemonWeight');
  let pokemonSprite = document.getElementById('pokemonSprite');
  let pokemonError = document.getElementById('errorMessage');

  pokemonButton.addEventListener("click", getPokemonEntry);
  pokemonToLeftButton.addEventListener("click", placeOnLeftScale);
  pokemonToRightButton.addEventListener("click", placeOnRightScale);

  setPokemonSize(0, pokeLeftOne, pokeLeftTwo, pokeLeftThree, pokeLeftFour, pokeRightOne, pokeRightTwo, pokeRightThree, pokeRightFour);

  function getPokemonEntry() {
    let pokemonField = document.getElementById('pokemonfield');
    let pokemonNameInquiry = pokemonField.value.toLowerCase();
    axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemonNameInquiry)
      .then(function(response) {
        pokemonName.textContent = response.data.name.charAt(0).toUpperCase() + response.data.name.slice(1);
        pokemonWeight.textContent = (response.data.weight/10)+ " kg";
        pokemonSprite.src = response.data.sprites.front_default;
      })
      .catch(function(error) {
        pokemonName.textContent = "Error finding pokemon named: " + pokemonNameInquiry;
      })
    pokemonField.value = '';
  }

  function placeOnLeftScale() {
    pokemonError.textContent = "";
    if(!pokemonSprite.src) {
      pokemonError.textContent = "No pokemon searched";
    }else if(!pokeLeftOne.src) {
      pokeLeftOne.src = pokemonSprite.src;
      setPokemonSize(scaleArm.offsetWidth/15, pokeLeftOne);
      pokeLeftOne.weight = parseFloat(pokemonWeight.textContent);
      setScalePosition();
    } else if(!pokeLeftTwo.src) {
      pokeLeftTwo.src = pokemonSprite.src;
      setPokemonSize(scaleArm.offsetWidth/15, pokeLeftTwo);
      pokeLeftTwo.weight = parseFloat(pokemonWeight.textContent);
      setScalePosition();
    } else if(!pokeLeftThree.src) {
      pokeLeftThree.src = pokemonSprite.src;
      setPokemonSize(scaleArm.offsetWidth/15, pokeLeftThree);
      pokeLeftThree.weight = parseFloat(pokemonWeight.textContent);
      setScalePosition();
    } else if(!pokeLeftFour.src) {
      pokeLeftFour.src = pokemonSprite.src;
      setPokemonSize(scaleArm.offsetWidth/15, pokeLeftFour);
      pokeLeftFour.weight = parseFloat(pokemonWeight.textContent);
      setScalePosition();
    } else {
      pokemonError.textContent = "Left scale full";
    }
  }

  function placeOnRightScale() {
    pokemonError.textContent = "";
    if(!pokemonSprite.src) {
      pokemonError.textContent = "No pokemon searched";
    } else if(!pokeRightOne.src) {
      pokeRightOne.src = pokemonSprite.src;
      setPokemonSize(scaleArm.offsetWidth/15, pokeRightOne);
      pokeRightOne.weight = parseFloat(pokemonWeight.textContent);
      setScalePosition();
    } else if(!pokeRightTwo.src) {
      pokeRightTwo.src = pokemonSprite.src;
      setPokemonSize(scaleArm.offsetWidth/15, pokeRightTwo);
      pokeRightTwo.weight = parseFloat(pokemonWeight.textContent);
      setScalePosition();
    } else if(!pokeRightThree.src) {
      pokeRightThree.src = pokemonSprite.src;
      setPokemonSize(scaleArm.offsetWidth/15, pokeRightThree);
      pokeRightThree.weight = parseFloat(pokemonWeight.textContent);
      setScalePosition();
    } else if(!pokeRightFour.src) {
      pokeRightFour.src = pokemonSprite.src;
      setPokemonSize(scaleArm.offsetWidth/15, pokeRightFour);
      pokeRightFour.weight = parseFloat(pokemonWeight.textContent);
      setScalePosition();
    } else {
      pokemonError.textContent = "Right scale full";
    }
  }

  function setScalePosition() {
    let leftWeight = 0; 
    let rightWeight = 0;

    if(pokeLeftOne.src) {
      leftWeight += pokeLeftOne.weight;
      if(pokeLeftTwo.src) {
        leftWeight += pokeLeftTwo.weight;
        if(pokeLeftThree.src) {
          leftWeight += pokeLeftThree.weight;
          if(pokeLeftFour.src) {
            leftWeight += pokeLeftFour.weight;
          }
        }
      }
    }
    if(pokeRightOne.src) {
      rightWeight += pokeRightOne.weight;
      if(pokeRightTwo.src) {
        rightWeight += pokeRightTwo.weight;
        if(pokeRightThree.src) {
          rightWeight += pokeRightThree.weight;
          if(pokeRightFour.src) {
            rightWeight += pokeRightFour.weight;
          }
        }
      }
    }
    if(leftWeight == rightWeight) {
      setScaleRotation(0);
      setScales(0);
      setPokemon(0);
    } else if(leftWeight > rightWeight) {
      setScaleRotation(-15);
      setScales(1);
      setPokemon(1);
    } else {
      setScaleRotation(15);
      setScales(-1);
      setPokemon(-1);
    }
  }

  function setScaleRotation(rotationAngle) {
    scaleArm.style.transform = 'rotate(' + rotationAngle + 'deg)';
    scaleArm.style.transformOrigin = scaleArm.width/2 + 'px ' + scaleArm.height/4.94 + 'px';
  }

  function setScales(direction) {
    let verticalAdjustVal = scaleArm.height/9;
    let horizAdjustVal = scaleArm.width/95;
    if(direction == 0) {
      placeScales(0, 0);
    } else if(direction == 1) {
      placeScales(horizAdjustVal, verticalAdjustVal);
    } else {
      placeScales(horizAdjustVal, -verticalAdjustVal);
    }

    function placeScales(x, y) {
      leftScale.style.left = `${x}px`;
      rightScale.style.left = `${-x}px`;

      leftScale.style.top = `${y}px`;
      rightScale.style.top = `${-y}px`;
    }
  }

  function setPokemon(direction) {
    if(direction == 0) {
      placePokemon(scaleArm.offsetWidth*(0.7/20), scaleArm.offsetHeight*(40.1/70), pokeLeftOne, pokeLeftTwo, pokeLeftThree, pokeLeftFour);
      placePokemon(scaleArm.offsetWidth*(14.1/20), scaleArm.offsetHeight*(40.1/70), pokeRightOne, pokeRightTwo, pokeRightThree, pokeRightFour);
    } else if(direction == 1) {
      placePokemon(scaleArm.offsetWidth*(0.9/20), scaleArm.offsetHeight*(48/70), pokeLeftOne, pokeLeftTwo, pokeLeftThree, pokeLeftFour);
      placePokemon(scaleArm.offsetWidth*(14/20), scaleArm.offsetHeight*(32.3/70), pokeRightOne, pokeRightTwo, pokeRightThree, pokeRightFour);
    } else {
      placePokemon(scaleArm.offsetWidth*(0.9/20), scaleArm.offsetHeight*(32.2/70), pokeLeftOne, pokeLeftTwo, pokeLeftThree, pokeLeftFour);
      placePokemon(scaleArm.offsetWidth*(13.8/20), scaleArm.offsetHeight*(48/70), pokeRightOne, pokeRightTwo, pokeRightThree, pokeRightFour);
    }

    function placePokemon(x, y, ...pokemon) {
      for(let i = 0; i < pokemon.length; i++) {
        let poke = pokemon[i];
        poke.style.left = `${x + i*scaleArm.offsetWidth/15}px`;
        poke.style.top = `${y}px`
      }
    }
  }

  function setPokemonSize(size, ...pokemon) {
    for(let i = 0; i < pokemon.length; i++) {
      let poke = pokemon[i];
      poke.style.width = `${size}px`;
      poke.style.height = `${size}px`;
      poke.style.border = 'none';
    }
  }

});

