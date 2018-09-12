//variables ============================================
let attacker = {};
let defender = {};
let wins = 0;
let isAttackerSelected = false;
let isBattling = false;
let attackerHP ='';
let defendHP ='';
//clean slate============================================
initialize = () =>{
    attacker = [];
    defender = [];
    wins = 0;
    isBattling = false;
    isAttackerSelected = false;
    rules();
};
//puts current health on the screen======================
healthRewrite = () => {
    $('#gHp').text('HP: ' + Grimgore.hp);
    $('#sHp').text('HP: ' + Shatter.hp);
    $('#mHp').text('HP: ' + Mirimoto.hp);
    $('#hHp').text('HP: ' + Ham.hp);
}
healthRewrite();

//funtion used to select the opponent=====================
defenderSelect = () =>{
    if($('#defend').find('#grimgore').length){
        console.log('Grimgore')
        defender = Grimgore;
        // defender.name = Grimgore.name;
        // defender.counterAttackPower = 50;
        // defender.hp = 100;
    }
    else if($('#defend').find('#shatter').length){
       console.log('shatter')
       defender = Shatter;
    //    defender.name = Shatter.name;
    //    defender.counterAttackPower = 35;
    //    defender.hp = 130;
    }   
    else if($('#defend').find('#mirimoto').length){
       console.log('mirimoto')
       defender = Mirimoto;
    //    defender.name = Mirimoto.name;
    //    defender.counterAttackPower = 45;
    //    defender.hp = 145;
    }   
    else if($('#defend').find('#ham').length){
       console.log('ham')
       defender = Ham;
    //    defender.name = Ham.name;
    //    defender.counterAttackPower = 40;
    //    defender.hp = 110;
    }   
}

charDeath = () =>{
    if(attacker.hp <= 0){
        alert('game over')
        initialize();
    }
    else{
        return false;
    }
}

//function to determin death states for both char=========
deathAction = () =>{
    if (defender.hp > 0){
        return false
    }
    else{
        $($('#defend').find('.character')).detach()
        defender = [];
        isBattling = false;
        wins++;
        if (wins === 3){
            alert('congradulations champion');
        }else{
            alert('choose your next opponent');
        };
    };
};

//function for attack action===============================
attackAction = () =>{
    defender.hp -= attacker.attackPower;   
    $('#moveResult').html('You hit ' + defender.name + ' for ' + attacker.attackPower + ' points of damage and suffer ' + defender.counterAttackPower + ' points of damage!');
    attacker.attackPower += 20;
}
//script for the opponents attack==========================
counterAttackAction = () =>{
    attacker.hp -= defender.counterAttackPower;   
}

rules = () =>{
    if(isBattling){
        $('#choose').hide(); 
        $('#rules').hide()     
    }else{
        $('#choose').show();
        $('#rules').show();
    }
}

//event for selecting attacker and defender(nested function)
$('.character').on('click', function(){
   //prevents double-team
    if(isBattling){
        return false;
    }
    //defender select
    if(isAttackerSelected){
        $('#defend').prepend(this);
        defenderSelect();
        isBattling = true;
        console.log(defender);
        rules();
    }
    //attacker select
    else{
        $('#attack').prepend(this);
        isAttackerSelected = true;

            if($('#attack').find('#grimgore').length){
                console.log('Grimgore')
                attacker = Grimgore;
                attackerHP = attacker.hp;
            }
            else if($('#attack').find('#shatter').length){
               console.log('shatter')
                attacker = Shatter;
                attackerHP = attacker.hp;
            }      
            else if($('#attack').find('#mirimoto').length){
               console.log('mirimoto')
                attacker = Mirimoto
                attackerHP = attacker.hp;
            }   
            else if($('#attack').find('#ham').length){
               console.log('ham')
                attacker = Ham;
                attackerHP = attacker.hp;
            }   

        console.log(attacker);

    }
});



//attack event listener
$('#attackButton').on('click', function(){
    if(isBattling === false){
        return false;
    }
    else{
        attackAction();       
        deathAction();
        if(isBattling === true){
        counterAttackAction();
        }
        healthRewrite();
        console.log('attack');
    }
    charDeath();
});


