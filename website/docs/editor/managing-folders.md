---
sidebar_label: Managing Folders
sidebar_position: 2
---

# Managing Folders

Folders let you group related layers under a common heading in the layer tree. They are purely organizational — they have no effect on the map rendering.

## Adding a folder

1. In the **Layers** tab, click **Add Folder**.
2. Fill in the folder form:

   | Field | Required | Description |
   |---|---|---|
   | **Name** | ✓ | Display name shown in the layer tree |
   | **Parent** | ✓ | The existing folder under which this folder will appear. Defaults to `root`. |
   | **Description** | — | MDX-formatted text shown in the Description tab when the folder is selected |
   | **Download URL** | — | Link shown as a download icon next to the folder |

3. Click **Save**. The new folder appears inside the selected parent.

## Editing a folder

Click the **Edit** link next to any folder in the tree. Change the name, description, or download URL and click **Update**.

Renaming a folder does not affect its ID or any layer references.

## Deleting a folder

Click **Delete** next to a folder.

:::warning
Deleting a folder also removes all its children (sub-folders and layers) from the tree. This action cannot be undone from the UI — use the **Download Config** button first if you want a backup.
:::

## Moving layers between folders

Layers are organized via the tree structure. To move a layer to a different folder, drag-and-drop the layer under the new parent.

Use the **Manage** tab to reorder layers within the active draw order.
