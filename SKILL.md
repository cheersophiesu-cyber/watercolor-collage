---
name: watercolor-collage
description: Transform a user-provided photo into a vertical 2:3 art poster with the original photograph preserved above and a sparse watercolor-and-paper collage reinterpretation plus a short English poem below. Use for pet memorial pages, poetic photo diptychs, editorial keepsakes, or vintage book-page compositions. Do not use when the user wants the entire photograph repainted or stylized.
---

# Watercolor Collage

Create one finished high-resolution vertical 2:3 raster poster from the user's uploaded photograph. Generate the illustrated lower panel separately, then assemble it with the untouched source photograph using `scripts/compose-diptych.mjs`. Do not ask an image model to generate or reconstruct the finished upper panel.

## Completion contract

The image-generation result is always an intermediate asset, never the deliverable. After the image tool returns, continue working in the same turn: save the generated lower panel, run the compositor, inspect the assembled file, and return only that assembled file.

Do not finish, summarize, or show a final answer until all four states are true:

1. `SOURCE_IMAGE` is the accessible original upload.
2. `LOWER_PANEL` is a saved raster file containing only the illustrated lower panel.
3. `OUTPUT_IMAGE` was created successfully by `scripts/compose-diptych.mjs` and exists on disk.
4. `OUTPUT_IMAGE` passed the final visual and dimensional checks below.

If image generation succeeds but saving or compositing fails, report the concrete failure and keep the generated image labeled as an intermediate preview. Never substitute it for the finished poster. Never return the lower panel by itself.

## Source handling

- Require an accessible source image. If it is missing, ask the user to upload it and stop.
- Inspect the source before generation. Identify every person and animal, their pose, direction, expression, colors, clothing or accessories, relative positions, and the few environmental details that make the scene recognizable.
- Treat the upper panel as preserved source material. Never resize it by forcing both width and height. Its horizontal and vertical scale factors must be identical.
- Default to `cover`: fill the upper slot edge to edge while preserving the photograph's aspect ratio. Never introduce letterboxing or pillarboxing merely to avoid an ordinary background crop.
- Inspect the image and choose `--focus-x` and `--focus-y` values from 0 to 1 so the crop is centered around the main subject group rather than the geometric center. Prefer removing ceiling, floor, table edges, sky, or other nonessential background.
- Keep main subjects as complete as the source and target aspect ratios allow. A crop should not pass through a face, head, torso, animal body, or the defining part of an action. Preserve limbs, tails, ears, clothing silhouettes, and key accessories whenever possible.
- Use `contain` only as an exception when no focal crop can fill the panel without severely truncating a main subject. Filling the panel is the default; subject-aware cropping is the mechanism for doing it safely.
- Do not send the upper panel through image generation. Do not redraw, extend, replace, stylize, retouch, warp, squeeze, stretch, or rearrange it.
- Preserve the count and identity of all intended subjects. Never merge, duplicate, omit, or invent subjects.

## Composition

- Produce a single borderless vertical 2:3 poster with a crisp horizontal division.
- Allocate approximately 45–50% of the height to the upper photographic panel and 50–55% to the lower illustrated panel.
- Keep the upper panel free of text and decoration. Preserve its original composition, environment, lighting, color relationships, spatial relationships, and candid photographic character.
- Give the lower panel an off-white vintage art-paper ground with subtle fibers and grain. Keep the subject small and concentrated with generous negative space.

## Assembly workflow

1. Choose explicit local paths for `SOURCE_IMAGE`, `LOWER_PANEL`, and `OUTPUT_IMAGE`. Keep intermediate and final files distinct; never overwrite the source.
2. Generate only the lower watercolor-collage panel. Give the image tool the source photograph as a semantic reference, but explicitly request a standalone illustrated lower panel with no photographic upper panel. Treat any image shown by the tool as an intermediate preview.
3. Save or export that generated lower panel to `LOWER_PANEL`. Confirm the file exists and is readable before continuing.
4. Run the deterministic compositor from the skill directory and wait for it to exit successfully:

   ```bash
   node scripts/compose-diptych.mjs SOURCE_IMAGE LOWER_PANEL OUTPUT_IMAGE
   ```

5. Require exit code 0 and parse the compositor's JSON report. Confirm `aspectRatioPreserved` is `true`, `scaleX` equals `scaleY`, the canvas is 2:3, and `OUTPUT_IMAGE` exists.
6. Use the default `cover` mode and set a subject-aware focal point when the main subject is not centered, for example `--focus-x 0.55 --focus-y 0.45`. Preview the crop and adjust the focus until the main subjects are as complete as possible. Use `--photo-fit contain` only when no filled crop is acceptable.
7. Inspect `OUTPUT_IMAGE`, not the image-tool preview. If the upper photograph appears stretched, squashed, redrawn, missing, or cropped through a subject, reject it and rerun the compositor with a corrected focus rather than returning it.
8. Return `OUTPUT_IMAGE` as the sole finished image. Do not return `LOWER_PANEL`, an image-generation URL, or the prompt as the result.

The compositor creates a 1200 × 1800 poster by default, places the photographic panel in the top 840 pixels, and uses a single uniform scale factor for the source. It requires Node.js and `sharp`. If `sharp` is unavailable, use another deterministic raster compositor with equivalent aspect-preserving cover and focal-crop semantics; never fall back to single-pass image generation for the upper panel.

## Lower-panel translation

Reinterpret the subjects and only the most important scene cues as a minimalist deconstructed collage illustration.

- Build subjects from rough irregular watercolor shapes, dry-brush marks, printmaking ink, and torn-paper edges. Let transparent pigment, paper grain, and restrained dry watercolor texture remain visible.
- Abstract the forms into a naive, relaxed construction while accurately retaining each subject's coat or clothing colors, pose, facing direction, expression, identifying markings, and key accessories.
- Extract only a few scene-specific cues—such as flowers, water, grass, tree shadows, toys, railings, or other salient objects—and reduce them to scattered abstract shapes and restrained collage marks.
- Do not reconstruct a complete background. Let broad areas of the paper remain empty.
- Use lines sparingly to suggest structure and color blocks to establish form.
- Derive a low-saturation natural palette from the source photograph.
- Evoke restrained watercolor, screen printing, old-book illustration, botanical rubbing, dry-brush relief printing, and handmade paper collage. Include slight misregistration, missing pigment, wear, and incomplete edges.
- Avoid crisp black outlines, cartoon-vector styling, large wet-on-wet blooms, dreamy gradients, sugary watercolor illustration, impasto painting, glossy digital rendering, photorealistic illustration, and a busy full-frame background.

## Poem

Write one original, very short English line tied to the concrete action or setting in the source image. Keep it quiet, tender, and restrained. Set it in a small vintage typewriter-style serif face on one or two lines in nearby negative space.

Do not add a title, logo, brand name, date, border, caption, or explanatory copy. Check the rendered text for exact spelling; regenerate or correct the image if it is malformed.

## Final check

Before returning the result, open the local `OUTPUT_IMAGE` and verify the 2:3 orientation, clear horizontal split, untouched photographic character of the upper panel, and identical horizontal and vertical scaling of that photograph. Check recognizable geometry such as faces, eyes, balls, wheels, plates, or other circular objects for any flattening. Confirm that every main subject remains fully visible and that no crop boundary cuts through a head, body, limb, tail, clothing silhouette, or key accessory. Also verify subject count and identity, pose and color fidelity in the lower panel, ample off-white negative space, restrained print-collage texture, and one legible original poem only.

A valid final response displays or links the local assembled `OUTPUT_IMAGE`. If that file cannot be produced or verified, state that the poster is incomplete instead of presenting any intermediate generated image as finished.
