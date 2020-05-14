function solution(relation) {
  var answer = 0;
  // Looping each categories
  let isUnique = true
  for (let categories = 0; categories < relation[0].length; categories++) {
    // To Check is there any unique key or not
    for (let i = 0; i < relation.length; i++) {
      for (let j = i + 1; j < relation.length; j++) {
        if (relation[i][categories] === relation[j][categories]) {
          isUnique = false
        }
      }
    }
    // If after we check the isUnique still true the answer will added 1, if isUnique false. we will try to combine with another key
    if (isUnique) {
      answer++
    } else {
      isUnique = true
      for (let categories2nd = categories + 1; categories2nd < relation[0].length; categories2nd++) {
        for (let k = 0; k < relation.length; k++) {
          for (let l = k + 1; l < relation.length; l++) {
            if (relation[k][categories] + relation[k][categories2nd] === relation[l][categories] + relation[l][categories2nd]) {
              isUnique = false
            }
          }
        }
        isUnique && answer++
      }
    }
  }
  return answer;
}



let relation = [
  [100, "ryan", "music", 2],
  [200, "apeach", "math", 2],
  [300, "tube", "computer", 3],
  [400, "con", "computer", 4],
  [500, "muzi", "music", 3],
  [600, "apeach", "music", 2]
]
// answer: 2
console.log(solution(relation));