import { GameComponent } from "../$component";
import { MicroTile } from "./map.models";
import { testMap } from '../shared/configs/maps/index';

/**
 * ? NOTES
 *
 */
export class GameMap {
  private grid!: MicroTile[][];

  private components!: GameComponent[];

  constructor() {
    console.warn(this.loadMap(testMap));
  }

  private convertMap(): string {
    return this.grid.map(row => row.map(tile => 'test').join(' ')).join('\n');
  }

  public loadMap(mapData: string): string[][] {
    const rows = mapData.split('\n'); // Split by new lines
    return rows.map(row => row.trim().split(/\s+/)); // Split each row by spaces
  }

  public downloadMap(mapData: string, mapName: string): void {
    const blob = new Blob([mapData], { type: 'text/plain' });

    const link = document.createElement('a');
    const url = window.URL.createObjectURL(blob);

    link.href = url;
    link.download = `${mapName}.txt`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  // TODO complete implementation
  public uploadMap(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target) {
          resolve(event.target.result as string);
        }
      };

      reader.onerror = (event) => {
        reject(event);
      };

      reader.readAsText(file);
    });
  }
}
