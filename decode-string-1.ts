function decodeRecur(s: string): string {
    let result = '';
    let i = 0;
    let squaresCount = 0;
    let substrCount = 0;
    let substr = '';
    for (let char of s) {
        if (squaresCount > 0 && (char !== ']' || squaresCount !== 1))
            substr += char;
        
        if (squaresCount === 0 && char.toUpperCase() != char.toLowerCase()) {
            result += char;
        } else if (squaresCount === 0 && !isNaN(Number(char))) {
            substrCount = substrCount * 10 + Number(char);
        } else if (char === '[') {
            squaresCount++;
        } else if (char === ']' && squaresCount > 0) {
            squaresCount--;
            if (squaresCount === 0) {
                result += decode(substr).repeat(substrCount);
                substr = '';
                substrCount = 0
            }
        }
    }

    return result;
}


function decodeLinear(_s: string): string {
    let i = 0;
    let lastCloseSquareIndex: number;
    const s = [..._s];

    while (i < s.length) {
        if (s[i] === ']') {
            lastCloseSquareIndex = i;
            while (s[i] !== '[') i--;
            let substr = s.slice(i+1, lastCloseSquareIndex);
            i--;
            let pow = 0;
            let segmentsCount = 0;
            while (!isNaN(Number(s[i]))) {
                segmentsCount += Number(s[i]) * Math.pow(10, pow);
                pow++;
                i--;
            }
            s.splice(i+1, lastCloseSquareIndex-i, ...Array(segmentsCount).fill(substr).flat());
            i += segmentsCount * substr.length;
        } else {
            i++;
        }
    }

    return s.join('');
}

console.log(decode('a3[dr5[t]]bf6[rtrtuy]'));
