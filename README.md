# Watercolor Collage

A Codex skill that turns an uploaded photograph into a vertical 2:3 poetic art poster: the original photo is preserved in the upper panel, while the lower panel becomes a sparse handmade watercolor-and-paper collage with a short original English poem.

## Install

Copy the `watercolor-collage` folder into your Codex skills directory:

```bash
mkdir -p ~/.codex/skills
cp -R watercolor-collage ~/.codex/skills/
```

Restart Codex if the skill does not appear immediately.

## Use

Upload a photo, then ask:

```text
Use $watercolor-collage to turn this photo into a poetic watercolor collage poster.
```

The skill requires an image-generation or image-editing capability that accepts a source image.

## License

MIT
