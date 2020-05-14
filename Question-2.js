function solution(N, users) {
  //To make a limitation of total stages and total player
  if (N < 1 || N > 500) {
    return "Total stages is betweem 1-500"
  }
  if (users.length <= 0 || users.length > 200000) {
    return "The length of array users: 1 ~ 200,000"
  }
  var answer = [];
  let arrPlayersLevel = []
  let totalPlayerLevel = []
  // To Check a players in the same level
  for (let i = 0; i < users.length; i++) {
    let playersInSameLevel = 0
    for (let j = i; j < users.length; j++) {
      if (users[i] == users[j] && i <= j) {
        playersInSameLevel++
      }
    }
    arrPlayersLevel.push([users[i], playersInSameLevel])
  }
  // To Groups and Count all of players in the same level
  for (let k = 0; k < arrPlayersLevel.length; k++) {
    for (let l = k; l < arrPlayersLevel.length; l++) {
      if (arrPlayersLevel[k][0] == arrPlayersLevel[l][0] && k == l && arrPlayersLevel[l][0] !== 0) {
        totalPlayerLevel.push([arrPlayersLevel[k][0], arrPlayersLevel[k][1]])
      } else if (arrPlayersLevel[k][0] == arrPlayersLevel[l][0] && k < l) {
        arrPlayersLevel[l][0] = 0
        arrPlayersLevel[l][1] = 0
      }
    }
  }
  totalPlayerLevel.sort(function (a, b) {
    return a[0] - b[0];
  });
  //Counting All Player 
  let totalPlayer = 0
  for (let m = 0; m < totalPlayerLevel.length; m++) {
    totalPlayer += totalPlayerLevel[m][1]
  }
  let totalFailure = []
  //To Count Failure Rate in each level and Relocate them in an array (totalFailure)
  for (let p = 1; p < N + 1; p++) {
    let failureRate = 0
    for (let n = 0; n < totalPlayerLevel.length; n++) {
      if (totalPlayerLevel[n][0] == p) {
        failureRate = totalPlayerLevel[n][1] / totalPlayer
        totalPlayer -= totalPlayerLevel[n][1]
        totalFailure.push([p, failureRate])
      }
    }
    if (totalPlayerLevel[totalPlayerLevel.length - 1][0] > p) {
      totalFailure.push([p, 0])
    }
  }
  totalFailure.sort(function (a, b) {
    return b[1] - a[1];
  });
  // To Count an Answer 
  for (let q = 0; q < totalFailure.length; q++) {
    if (totalFailure[q][1] !== 0) {
      answer.push(totalFailure[q][0])
    }
    for (let r = 0; r < totalFailure.length; r++) {
      if (totalFailure[q][1] == 0 && totalFailure[r][0] != totalFailure[q][0]) {
        answer.push(totalFailure[q][0])
      }
    }
  }
  //To make an unique value from duplicated value
  answer = answer.filter((item, i, ar) => ar.indexOf(item) === i);
  return answer;
}


// N: 5
// users: [2, 1, 2, 6, 2, 4, 3, 3]
// answer: [3, 4, 2, 1, 5]
console.log(solution(5, [2, 1, 2, 6, 2, 4, 3, 3]))

// N: 4
// users: [4, 4, 4, 4, 4]
// answer: [4, 1, 2, 3]
console.log(solution(4, [4, 4, 4, 4, 4]))
