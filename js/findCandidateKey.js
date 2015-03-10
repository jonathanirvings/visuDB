//var relations = new Array();
/*
   var rel =["a","b", "c", "d","e"];
   relations[0] = ["a","b"];
   relations[1] = ["c"];
   relations[2] = ["c","d"];
   relations[3] = ["e"];
   relations[4] = ["c"];
   relations[5] = ["a", "d"];
   relations[6] = ["d"];
   relations[7] = ["b"];
 */ 
/*
   var rel =["a","b", "c", "d","e","f","g","h","i"];

   relations[0] = ["a","b"];
   relations[1] = ["f"];
   relations[2] = ["a","c"];
   relations[3] = ["g"];
   relations[4] = ["a","d"];
   relations[5] = ["b"];
   relations[6] = ["a","e"];
   relations[7] = ["h"];
   relations[8] = ["b"];
   relations[9] = ["c","e"];
   relations[10] = ["e"];
   relations[11] = ["b"];
   relations[12] = ["c"];
   relations[13] = ["d"];
 */
/*
   var rel =["a","b", "c", "d","e"];

   relations[0] = ["a","b"];
   relations[1] = ["d"];
   relations[2] = ["d","b", "c"];
   relations[3] = ["e"];
 */
/*
   var rel =["a","b", "c", "d","e","f","g"];
   relations[0] = ["a","b"];
   relations[1] = ["f"];
   relations[2] = ["a","d"];
   relations[3] = ["e"];
   relations[4] = ["f"];
   relations[5] = ["g"];
 */
/*
   var rel =["a","b", "c", "d"];
   relations[0] = ["a","b","c"];
   relations[1] = ["d"];
   relations[2] = ["d"];
   relations[3] = ["a"];
 */
/*
   var rel =["a","b", "c", "d","e"];
   relations[0] = ["a"];
   relations[1] = ["b","c"];
   relations[2] = ["c","d"];
   relations[3] = ["e"];
   relations[4] = ["b"];
   relations[5] = ["d"];
   relations[6] = ["e"];
   relations[7] = ["a"];
 */
/*
   var rel =["a","b", "c", "d","e","f"];
   relations[0] = ["d","f"];
   relations[1] = ["c"];
   relations[2] = ["b","c"];
   relations[3] = ["f"];
   relations[4] = ["e"];
   relations[5] = ["a"];
   relations[6] = ["a","b","c"];
   relations[7] = ["e"];
 */

/*var rel =["a","b", "c", "d","e"];
  relations[0] = ["a"];
  relations[1] = ["e"];
  relations[2] = ["b","c"];
  relations[3] = ["a"];
  relations[4] = ["d","e"];
  relations[5] = [“b”];*/
//exports.findCandidateKey = findCandidateKey;
module.exports= {
		findCandidateKey : findCandidateKey,
		findCandidateKeyWSuperKeys : findCandidateKeyWSuperKeys,
		ConvertBinaryToCandidateKey : ConvertBinaryToCandidateKey,
		ConvertFdToBinary : ConvertFdToBinary,
		GetNumberOfBits : GetNumberOfBits,
		printArray : printArray,
		printNumber : printNumber,
		removeByIndex :removeByIndex,
		removeFunctionalDependencies : removeFunctionalDependencies
}
var findCandidateKey = function(rel, relation){
		var binary = Array.apply(null, new Array(relations.length)).map(Number.prototype.valueOf,0);
		var relations = new Array();
		for(i = 0; i <relation.dependencies ; i+=2){
			relations[i*2] = relation.dependencies[i].left.slice();
			relations[i*2+1] = relation.dependencies[i].right.slice();

		}
		ConvertFdToBinary(binary, relations,rel);

		var flag;
		var copyOfBinary = binary.slice();
		var superKeysArray = new Array();
		var limit = (1 << rel.length)-1;
		for(i = 0; i < limit ; i++){
				x = i;
				//iterate through all functional dependencies 
				do{
						flag = 0;
						//go through all functional dependencies
						for(j = 0; j < binary.length; j+=2){
								//eliminate the functional dependency after its righthandside is added to the x
								if((x & binary[j]) == binary[j]){
										flag = 1;
										x = x | binary[j+1];
										removeFunctionalDependencies(binary,j);
										j-=2;

								}
						}
				}while((flag != 0) && (binary.length != 0));

				//if x is a super key store in superKeys
				if(x == (1 << rel.length)-1){
						superKeysArray.push(i);

				}
				//refresh to have new copy of Binary
				binary = copyOfBinary.slice();

		}


		var candidateKeysArray = new Array();
		candidateKeysArray = findCandidateKeyWSuperKeys(rel, superKeysArray, binary);
		candidateKeysArray = ConvertBinaryToCandidateKey(candidateKeysArray,rel);
		return candidateKeysArray
}
var findCandidateKeyWSuperKeys = function(rel, superKeysArray, binary){
		var index, smallestNoOfBits;

		var tempToStoreSomeCandidateKeys = new Array();

		for(index = 1; index <= rel.length; index++){
				//find the all the keys with then index length
				for(c = 0 ;c < superKeysArray.length;c++){
						if(GetNumberOfBits(superKeysArray[c]) == index){
								tempToStoreSomeCandidateKeys.push(superKeysArray[c]);

								var a;
								for(a = c; a < superKeysArray.length - 1; a++){
										superKeysArray[a] = superKeysArray[a+1]; 
								}
								superKeysArray.pop();
								c--;
						}
				}
				//remove super keys that the key is subset of
				for(u = 0; u < superKeysArray.length; u++){
						for(n = 0; n < tempToStoreSomeCandidateKeys.length; n++){
								if((superKeysArray[u] & tempToStoreSomeCandidateKeys[n]) != 0){
										removeByIndex(superKeysArray,u);
										u--;
										break;
								}
						}
				}
				//add the candidate keys to answer
				candidateKeysArray.push.apply(candidateKeysArray, tempToStoreSomeCandidateKeys);
				tempToStoreSomeCandidateKeys.length = 0;
		}
		return candidateKeysArray

}

var ConvertBinaryToCandidateKey = function(candidateKeysArray,rel){
		var i, s, q;
		candidateKey = new Array();
		temp = new Array();

		for(s = 0 ; s <candidateKeysArray.length;s++){
				q = candidateKeysArray[s];
				for(i = 0; i < rel.length; i++){

						if((1 << (rel.length - i -1 ) & q) != 0){
								temp.push(rel[i]); 
						}
				}
				candidateKey[s]= temp.slice();
				temp.length = 0;
		}
		return candidateKey;
}
var ConvertFdToBinary = function(binary,relations, rel){
		var h,i,j, x;
		var z =0 ;
		for(h = 0; h < relations.length; h++){
				for(i = 0; i < relations[h].length; i++){
						for(j = 0; j < rel.length; j++){

								if(relations[h][i] == rel[j]){

										x = 1 << (rel.length - j -1 );
										z= x|z;
										binary[h] = z;
								}
						}
				}
				z = 0;
		}
}

var GetNumberOfBits = function(i){
		i = i - ((i >> 1) & 0x55555555);
		i = (i & 0x33333333) + ((i >> 2) & 0x33333333);
		return  (((i + (i >> 4)) & 0x0F0F0F0F) * 0x01010101) >> 24;
}

var printArray = function(array){
		for(h =0;h < array.length;h++){
				var s = array[h].toString(2) + "";
				while(s.length < rel.length){
						s = "0" + s;
				}
				console.log(s);
		}
}

var printNumber = function(array){
		var s = array.toString(2) + "";
		while(s.length < rel.length){
				s = "0" + s;
		}
		console.log(s);
}

var removeByIndex = function(array, n){
		var a;
		for(a = n; a < array.length -1; a++){
				array[a] = array[a+1]; 
		}
		array.pop();

}
var removeFunctionalDependencies =function(array, j){
		var ind;
		for(ind = j; ind < array.length-2; ind++){
				array[ind] = array[ind+2];

		}

		array.pop();
		array.pop();
}

