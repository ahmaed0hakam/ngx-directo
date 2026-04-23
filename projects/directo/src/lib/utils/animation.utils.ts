import { 
  AnimationMetadata, 
  AnimationStyleMetadata
} from '@angular/animations';

/**
 * [LEGACY] Enterprise-Grade Animation Mirroring Utility.
 * Note: This utility is for the classic @angular/animations DSL which is deprecated as of Angular 20.2.
 * For modern projects, prefer using CSS Variables (--dir-sign) for direction-aware animations.
 * 
 * Deeply recurses through Angular Animation DSL (Transitions, Groups, Sequences, Keyframes)
 * and mirrors directional CSS properties like transform, left, right, margin, and padding.
 * 
 * @author Ahmad Alhafi
 * @param metadata The Angular Animation metadata branch to mirror
 * @returns A mirrored copy of the animation metadata
 */
export function mirrorAnimation(metadata: any | any[]): any {
  if (Array.isArray(metadata)) {
    return metadata.map(step => mirrorAnimation(step));
  }

  const type = (metadata as any).type;

  // 1. Handle Styles and Keyframes (The actual CSS properties)
  // AnimationMetadataType.Style = 6, Keyframes = 5
  if (type === 6 || type === 5) {
    const styleMeta = metadata as AnimationStyleMetadata;
    const styles = styleMeta.styles;

    if (Array.isArray(styles)) {
      styleMeta.styles = (styles as any[]).map(s => mirrorProperties(s));
    } else {
      styleMeta.styles = mirrorProperties(styles);
    }
    return styleMeta;
  }

  // 2. Handle Recursive Containers (Sequence=2, Group=3, Transition=1, Animate=4)
  if (type === 2 || type === 3 || type === 1 || type === 4) {
    const container = metadata as any;
    if (container.steps) {
      container.steps = container.steps.map((step: any) => mirrorAnimation(step));
    }
    // For 'animate', also check the styles
    if (type === 4 && container.styles) {
      container.styles = mirrorAnimation(container.styles);
    }
    return container;
  }

  return metadata;
}

/**
 * Internal helper to swap directional CSS properties in a style object.
 * @author Ahmad Alhafi
 */
function mirrorProperties(styleObj: any): any {
  if (!styleObj || typeof styleObj !== 'object') return styleObj;

  const mirrored = { ...styleObj };
  const swaps: { [key: string]: string } = {
    'left': 'right',
    'right': 'left',
    'paddingLeft': 'paddingRight',
    'paddingRight': 'paddingLeft',
    'marginLeft': 'marginRight',
    'marginRight': 'marginLeft',
    'borderLeft': 'borderRight',
    'borderRight': 'borderLeft'
  };

  Object.keys(swaps).forEach(prop => {
    if (prop in mirrored) {
      const target = swaps[prop];
      const temp = mirrored[prop];
      mirrored[prop] = mirrored[target];
      mirrored[target] = temp;
    }
  });

  // Smart mirroring for transform strings (e.g., translateX, rotate)
  if (mirrored.transform && typeof mirrored.transform === 'string') {
    mirrored.transform = mirrored.transform.replace(/translateX\(([^)]+)\)/g, (match: string, val: string) => {
      if (val.startsWith('-')) return `translateX(${val.substring(1)})`;
      return `translateX(-${val})`;
    });
  }

  return mirrored;
}
