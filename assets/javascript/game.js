//variables 
let attacker = {};
let defender = {};
let wins = 0;
let isAttackerSelected = false;
let isBattling = false;
let attackerHP ='';
let defendHP ='';

$('#gHp').text('HP: ' +Grimgore.hp)
$('#sHp').text('HP: ' +Shatter.hp)
$('#mHp').text('HP: ' +Mirimoto.hp)
$('#hHp').text('HP: ' +Ham.hp)

//funtion used to select the opponent
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

//function to determin death states for both char
deathAction = () =>{
    if (defender.hp > 0){
        return false
    }else if(attacker.hp <= 0){
        alert('game over')
    }
    else if (wins === 3){
        alert('congradulations champion')

    }else{
        $($('#defend').find('.character')).detach()
        defender = [];
        isBattling = false;
        wins++;
        alert('choose your next opponent')
    }
}

//function for attack action
attackAction = () =>{
    defender.hp -= attacker.attackPower;
    attacker.hp -= defender.counterAttackPower;
    attacker.attackPower += 10;
    $('#moveResult').html('You hit ' + defender.name + ' for ' + attacker.attackPower + ' points of damage and suffer ' + defender.counterAttackPower + ' points of damage! That has GOT to Hurt')
    deathAction();
    

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
    }
    //attacker select
    else{
        $('#attack').prepend(this);
        isAttackerSelected = true;

            if($('#attack').find('#grimgore').length){
                console.log('Grimgore')
                attacker = Grimgore;
            //  attacker.attackPower = Grimgore.attackPower;
            //  attacker.hp = Grimgore.hp;
                attackerHP = attacker.hp;
            }
            else if($('#attack').find('#shatter').length){
               console.log('shatter')
                attacker = Shatter;
            //  attacker.attackPower = Shatter.attackPower;
            //  attacker.hp = Shatter.hp;
                attackerHP = attacker.hp;
            }      
            else if($('#attack').find('#mirimoto').length){
               console.log('mirimoto')
               attacker = Mirimoto
            // attacker.attackPower = Mirimoto.attackPower;
            // attacker.hp = Mirimoto.hp;
                attackerHP = attacker.hp;
            }   
            else if($('#attack').find('#ham').length){
               console.log('ham')
               attacker = Ham;
            // attacker.attackPower = Ham.attackPower;
            // attacker.hp = Ham.hp;
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
        console.log('attack');
    }
});

