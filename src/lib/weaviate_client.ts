import { WEAVIATE_URL } from '$env/static/private';
import weaviate from 'weaviate-ts-client';
import { type GuideStep } from './types';

const client = weaviate.client({
	scheme: 'http',
	host: WEAVIATE_URL // Replace with your Weaviate endpoint
});

// Define the 'Question' class
export const Knowledge_entry = {
	class: 'Entry',
	description: 'Information on a problem and steps to solve it', // description of the class
	vectorizer: 'text2vec-transformers',
	properties: [
		{
			name: 'problem',
			dataType: ['text'],
			description: 'The Desctiption of the problem',
			moduleConfig: {
				'text2vec-transformers': {
					// this must match the vectorizer used
					vectorizePropertyName: true,
					tokenization: 'word' // Use "lowercase" tokenization
				}
			}
		},
		{
			name: 'extra',
			dataType: ['text'],
			description: 'Images and extra information reguarding the answer',
			moduleConfig: {
				'img2vec-neural': {
					vectorizePropertyName: false
				}
			}
		},
		{
			name: 'description',
			dataType: ['text'],
			description: 'description about the problem',
			moduleConfig: {
				'text2vec-transformers': {
					// this must match the vectorizer used
					vectorizePropertyName: false,
					tokenization: 'word' // Use "whitespace" tokenization
				}
			}
		},
		{
			name: 'steps',
			dataType: ['text'],
			description: 'The answer',
			moduleConfig: {
				'text2vec-transformers': {
					// this must match the vectorizer used
					vectorizePropertyName: false,
					tokenization: 'word' // Use "whitespace" tokenization
				}
			}
		}
	]
};

// Add the class to the schema

console.log('Checking if weaviate has a class initialized');
if (((await client.schema.getter().do()).classes?.length ?? 0) < 1) {
	console.log('Weaviate Initialized');
	await client.schema.classCreator().withClass(Knowledge_entry).do();
}
console.log('Weaviate Ready');

export default client;
