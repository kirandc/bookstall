/* Indian Language Type Pad -  http://www.monusoft.com
Copyright (c) Monusoft

Permission is hereby granted to any person obtaining a copy of this software and associated 
the rights to use, copy, modify, merge copies of the Software for personal non-commercial use only and 
to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions 
of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED 
TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.
*/
var Vowel = new Array(123);
var VowelCombination = new Array(6);
var Consonant = new Array(123);
var ConsonantCombination = new Array(25);
var Symbol = new Array(60);
var VIRAM = 1;
var VRU = 2;
var RU = 3;
var language = "Hindi";

Symbol[32] = "\u0020"; // space
Symbol[58] = "\u0903"; // visarg
Symbol[48] = "\u0966"; //0
Symbol[49] = "\u0967"; //1
Symbol[50] = "\u0968"; //2
Symbol[51] = "\u0969"; //3
Symbol[52] = "\u096a"; //4
Symbol[53] = "\u096b"; //5
Symbol[54] = "\u096c"; //6
Symbol[55] = "\u096d"; //7
Symbol[56] = "\u096e"; //8
Symbol[57] = "\u096f"; //9

Vowel[97] = "\u0905"; //a
Vowel[65] = "\u0906"; //A
Vowel[105] = "\u0907"; //i
Vowel[73] = "\u0908"; //I
Vowel[117] = "\u0909"; //u 
Vowel[85] = "\u090a"; //U
Vowel[82] = "\u090b"; // R
Vowel[69] = "\u090d"; // E
Vowel[101] = "\u090f"; //e
Vowel[79] = "\u0911"; //O
Vowel[111] = "\u0913"; // o


VowelCombination[0] = new Array(3);
VowelCombination[0][0]= 97; //a
VowelCombination[0][1]= 97; //a
VowelCombination[0][2]= "\u0906"; //aa

VowelCombination[1] = new Array(3);
VowelCombination[1][0]= 101; //e
VowelCombination[1][1]= 101; //e
VowelCombination[1][2]= "\u0908"; //ee

VowelCombination[2] = new Array(3);
VowelCombination[2][0]= 111; //o
VowelCombination[2][1]= 111; //o
VowelCombination[2][2]= "\u090a"; //oo

VowelCombination[3] = new Array(3);
VowelCombination[3][0]= 82; //R
VowelCombination[3][1]= 85; //U
VowelCombination[3][2]= "\u090b"; 

VowelCombination[4] = new Array(3);
VowelCombination[4][0]= 97; //a
VowelCombination[4][1]= 105; //i
VowelCombination[4][2]= "\u0910"; //ai

VowelCombination[5] = new Array(3);
VowelCombination[5][0]= 97; //a
VowelCombination[5][1]= 117; //u 
VowelCombination[5][2]= "\u0914"; //au

Consonant[94] = "\u0901"; // chandrabindu
Consonant[77] = "\u0902"; // M
Consonant[107] = "\u0915"; //k
Consonant[103] = "\u0917"; //g
Consonant[106] = "\u091c"; //j
Consonant[122] = "\u091d"; //z
Consonant[84] = "\u091f"; //T
Consonant[68] = "\u0921"; //D
Consonant[78] = "\u0923"; //N
Consonant[116] = "\u0924"; //t
Consonant[100] = "\u0926"; //d
Consonant[110] = "\u0928"; //n
Consonant[112] = "\u092a"; //p
Consonant[102] = "\u092b"; //f
Consonant[98] = "\u092c"; //b
Consonant[109] = "\u092e"; //m
Consonant[121] = "\u092f"; //y
Consonant[114] = "\u0930"; //r
Consonant[108] = "\u0932"; //l
Consonant[76] = "\u0933"; //L
Consonant[118] = "\u0935"; //v
Consonant[119] = "\u0935"; //w
Consonant[115] = "\u0938"; //s
Consonant[120] = "\u0915\u094d\u0937"; //kSh
Consonant[104] = "\u0939"; //h
Consonant[97] = ""; // just empty string
Consonant[VIRAM] = "\u094d"; // half letter
Consonant[65] = "\u093e"; //A
Consonant[105] = "\u093f"; //i
Consonant[73] = "\u0940"; //I
Consonant[117] = "\u0941"; //u
Consonant[85] = "\u0942"; //U
Consonant[VRU] = "\u0943"; // VRU
Consonant[69] = "\u0945"; //E
Consonant[101] = "\u0947"; //e
Consonant[79] = "\u0949"; //O
Consonant[111] = "\u094b"; //o
Consonant[75] = "\u0958"; //K
Consonant[71] = "\u095a"; //G
Consonant[90]= "\u095b"; //Z
Consonant[70]= "\u095e"; //F
Consonant[89]= "\u095f"; //Y


ConsonantCombination[0] = new Array(3);
ConsonantCombination[0][0]= 107; //k
ConsonantCombination[0][1]= 104; //h
ConsonantCombination[0][2]= "\u0916"; // kh

ConsonantCombination[1] = new Array(3);
ConsonantCombination[1][0]= 103; //g
ConsonantCombination[1][1]= 104; //h
ConsonantCombination[1][2]= "\u0918"; //gh

ConsonantCombination[2] = new Array(3);
ConsonantCombination[2][0]= 99; //c
ConsonantCombination[2][1]= 104; //h
ConsonantCombination[2][2]= "\u091a"; //ch

ConsonantCombination[3] = new Array(3);
ConsonantCombination[3][0]= 67; //C
ConsonantCombination[3][1]= 104; //h
ConsonantCombination[3][2]= "\u091b"; //Ch

ConsonantCombination[4] = new Array(3);
ConsonantCombination[4][0]= 84; //T
ConsonantCombination[4][1]= 104; //h
ConsonantCombination[4][2]= "\u0920"; //Th

ConsonantCombination[5] = new Array(3);
ConsonantCombination[5][0]= 68; //D
ConsonantCombination[5][1]= 104; //h
ConsonantCombination[5][2]= "\u0922"; //Dh

ConsonantCombination[6] = new Array(3);
ConsonantCombination[6][0]= 116; //t
ConsonantCombination[6][1]= 104; //h
ConsonantCombination[6][2]= "\u0925"; //th

ConsonantCombination[7] = new Array(3);
ConsonantCombination[7][0]= 100; //d
ConsonantCombination[7][1]= 104; //dh
ConsonantCombination[7][2]= "\u0927"; //dh

ConsonantCombination[8] = new Array(3);
ConsonantCombination[8][0]= 112; //p
ConsonantCombination[8][1]= 104; //ph
ConsonantCombination[8][2]= "\u092b"; //ph

ConsonantCombination[9] = new Array(3);
ConsonantCombination[9][0]= 98; //b
ConsonantCombination[9][1]= 104; //h
ConsonantCombination[9][2]= "\u092d"; //bh

ConsonantCombination[10] = new Array(3);
ConsonantCombination[10][0]= 115; //s
ConsonantCombination[10][1]= 104; //h
ConsonantCombination[10][2]= "\u0936"; //sh

ConsonantCombination[11] = new Array(3);
ConsonantCombination[11][0]= 83; //S
ConsonantCombination[11][1]= 104; //h
ConsonantCombination[11][2]= "\u0937"; //Sh

ConsonantCombination[12] = new Array(3);
ConsonantCombination[12][0]= 74; //J
ConsonantCombination[12][1]= 104; //h
ConsonantCombination[12][2]= "\u091c\u094d\u091e"; // Jh

ConsonantCombination[13] = new Array(3);
ConsonantCombination[13][0]= 97; //a
ConsonantCombination[13][1]= 97; //a
ConsonantCombination[13][2]= "\u093e"; //aa

ConsonantCombination[14] = new Array(3);
ConsonantCombination[14][0]= 101; //e
ConsonantCombination[14][1]= 101; //e
ConsonantCombination[14][2]= "\u0940"; //ee

ConsonantCombination[15] = new Array(3);
ConsonantCombination[15][0]= 111; //o
ConsonantCombination[15][1]= 111; //o
ConsonantCombination[15][2]= "\u0942"; //oo

ConsonantCombination[16] = new Array(3);
ConsonantCombination[16][0]= 97; //a
ConsonantCombination[16][1]= 105; //i
ConsonantCombination[16][2]= "\u0948"; //ai

ConsonantCombination[17] = new Array(3);
ConsonantCombination[17][0]= 97; //a
ConsonantCombination[17][1]= 117; //u
ConsonantCombination[17][2]= "\u094c"; //au

ConsonantCombination[18] = new Array(3);
ConsonantCombination[18][0] = 78; // N
ConsonantCombination[18][1] = 71; // G
ConsonantCombination[18][2] = "\u0919"; //NG

ConsonantCombination[19] = new Array(3);
ConsonantCombination[19][0] = 78; // N
ConsonantCombination[19][1] = 89; // Y
ConsonantCombination[19][2] = "\u091e"; //NY

ConsonantCombination[20] = new Array(3);
ConsonantCombination[20][0] = 75; // K
ConsonantCombination[20][1] = 104; // h
ConsonantCombination[20][2] = "\u0959"; //Kh

ConsonantCombination[21] = new Array(3);
ConsonantCombination[21][0] = 68; // D
ConsonantCombination[21][1] = 68; // D
ConsonantCombination[21][2] = "\u095c"; //DD

ConsonantCombination[22] = new Array(3);
ConsonantCombination[22][0] = 68; // D
ConsonantCombination[22][1] = 72; // H
ConsonantCombination[22][2] = "\u095d"; //DH

ConsonantCombination[23] = new Array(3);
ConsonantCombination[23][0] = 78; // N
ConsonantCombination[23][1] = 78; // N
ConsonantCombination[23][2] = "\u0929"; //NN

ConsonantCombination[24] = new Array(3);
ConsonantCombination[24][0] = 82; // R
ConsonantCombination[24][1] = 82; // R
ConsonantCombination[24][2] = "\u0931"; //RRa

ConsonantCombination[25] = new Array(3);
ConsonantCombination[25][0] = 76; // L
ConsonantCombination[25][1] = 76; // L
ConsonantCombination[25][2] = "\u0934"; //LL
