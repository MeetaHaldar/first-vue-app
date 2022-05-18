function getRandom(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}

Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    playerStyleBar() {
      if (this.playerHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },

    mosterStyleBar() {
      if (this.monsterHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // draw
        this.winner = "draw";
      } else if (value > 0 && this.monsterHealth <= 0) {
        // player won
        this.winner = "player";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // draw
        this.winner = "draw";
      } else if (value > 0 && this.playerHealth <= 0) {
        // monster won
        this.winner = "monster";
      }
    },
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.logMessages = [];
      this.currentRound = 0;
    },
    attackMonster() {
      this.currentRound += 1;
      const attackValue = getRandom(12, 5);
      this.monsterHealth -= attackValue;
      this.addLogMessages("player", "attack", attackValue);
      this.attackPlayer();
      console.log(attackValue);
    },
    attackPlayer() {
      const attackValue = getRandom(15, 8);
      this.playerHealth -= attackValue;
      this.addLogMessages("monster", "attack", attackValue);
    },
    specialAttack() {
      this.currentRound += 1;
      const attackValue = getRandom(25, 5);
      this.monsterHealth -= attackValue;
      this.addLogMessages("player", "attack", attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandom(20, 8);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessages("player", "heal", healValue);

      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
      this.playerHealth = 0;
    },
    addLogMessages(who, what, value) {
      this.logMessages.push({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
}).mount("#game");
