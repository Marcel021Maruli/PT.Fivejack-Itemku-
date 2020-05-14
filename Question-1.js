function solution(record) {
  //To make limitation of record length
  if (record.length < 1) {
    return "Record length cannot less than 1"
  } else if (record.length > 100000) {
    return "Record length cannot greater than 100.000"
  }
  var answer = [];
  let splitRecord = [];
  //A regex to check no special characters but space can be allowed
  var regex = new RegExp("^[0-9a-zA-Z \b]+$")
  for (let i = 0; i < record.length; i++) {
    if (record[i].search(regex)) {
      return "Unrecognize Character. Character must be an uppercase letters, lowercase letters, or numbers only."
    }
    splitRecord.push(record[i].split(' '))
  }
  // To limit the length nickname and UserId
  for (let z = 0; z < splitRecord.length; z++) {
    if (splitRecord[z][0] !== "Leave") {
      if (splitRecord[z][2].length < 0 || splitRecord[z][2].length > 10) {
        return "Nickname length must between 1-10"
      }
    }
  }
  for (let j = 0; j < splitRecord.length; j++) {
    for (let k = 0; k < splitRecord.length; k++) {
      if (splitRecord[j][1].length < 0 || splitRecord[j][1].length > 10) {
        return "UserId length must between 1-10"
      } else if (splitRecord[j][1] == splitRecord[k][1]) {
        splitRecord[j][2] = splitRecord[k][2]
      }
    }
  }
  for (let l = 0; l < splitRecord.length; l++) {
    if (splitRecord[l][0] == 'Enter') {
      answer.push(`${splitRecord[l][2]} came in.`)
    } else if (splitRecord[l][0] == 'Leave') {
      answer.push(`${splitRecord[l][2]} has left.`)
    } else if (splitRecord[l][0] != 'Change') {
      answer.push('Un-Recognize Order')
    }
  }
  return answer
}

// The Answer Must Be
// ["Prodo came in.", "Ryan came in.", "Prodo has left.", "Prodo came in."]
const output = [
  "Enter uid1234 Muzi",
  "Enter uid4567 Prodo",
  "Leave uid1234",
  "Enter uid1234 Prodo",
  "Change uid4567 Ryan"
]
console.log(solution(output))