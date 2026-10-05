import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validateMessage, replyTo } from '../public/js/brain.js';

// Limite du cahier personnel du binôme b14.
const LIMITE = 200;

describe('validateMessage', () => {
  it('refuse une chaîne vide', () => {
    assert.equal(validateMessage('').ok, false);
  });

  it('refuse un message fait seulement d’espaces', () => {
    assert.equal(validateMessage('   ').ok, false);
  });

  it('nettoie les espaces autour', () => {
    assert.deepEqual(validateMessage('  salut  '), { ok: true, value: 'salut' });
  });

  it('accepte exactement la limite du cahier', () => {
    assert.equal(validateMessage('a'.repeat(LIMITE)).ok, true);
  });

  it('refuse un caractère de plus que la limite', () => {
    assert.equal(validateMessage('a'.repeat(LIMITE + 1)).ok, false);
  });
});

describe('replyTo', () => {
  it('répond pareil à SALUT et à salut', () => {
    assert.equal(replyTo('SALUT'), replyTo('salut'));
  });

  it('répond à musique autrement qu’à une phrase inconnue', () => {
    assert.notEqual(replyTo('musique'), replyTo('phrase que personne ne connaît'));
  });

  it('répond à cerise autrement qu’à une phrase inconnue', () => {
    assert.notEqual(replyTo('  Cerise '), replyTo('phrase que personne ne connaît'));
  });

  it('ne confond pas tester avec test', () => {
    assert.notEqual(replyTo('tester'), replyTo('test'));
  });
});
