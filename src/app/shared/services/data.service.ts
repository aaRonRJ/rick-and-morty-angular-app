import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';

const QUERY = gql`
{
    episodes {
        results {
            name
            episode
        }
    }
    characters {
        results {
            name
            status
            species
            gender
            origin {
                name
            }
            location {
                name
            }
            image
        }
    }
}
`;

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}
}
