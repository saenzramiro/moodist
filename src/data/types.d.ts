import type { Component } from 'vue';

export interface Sound {
  icon?: Component;
  id: string;
  label: string;
  src: string;
}

export type Sounds = Array<Sound>;

export interface Category {
  icon?: Component;
  id: string;
  sounds: Sounds;
  title: string;
}

export type Categories = Array<Category>;
