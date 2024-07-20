const db = require('../models');
const nodeHtmlToImage = require('node-html-to-image');

exports.createMap = async (req, res) => {
  try {
    const { name, grid, objects, icons, textures } = req.body;

    if (!name || !grid || !objects || !icons || !textures) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const map = await db.Map.create({
      name,
      grid,
      objects,
      icons,
      textures,
      userId: req.user.id,
    });

    res.status(201).json(map);
  } catch (error) {
    console.error('Error creating map:', error);
    res.status(500).json({ error: 'Failed to create map' });
  }
};

exports.getMap = async (req, res) => {
  try {
    const { id } = req.params;
    const map = await db.Map.findByPk(id);

    if (!map) {
      return res.status(404).json({ message: 'Map not found' });
    }

    res.status(200).json(map);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMaps = async (req, res) => {
  try {
    const maps = await db.Map.findAll({ where: { userId: req.user.id } });
    res.status(200).json(maps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMap = async (req, res) => {
  try {
    const { id } = req.params;
    const map = await db.Map.findByPk(id);

    if (!map) {
      return res.status(404).json({ message: 'Map not found' });
    }

    if (map.userId !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to update this map' });
    }

    const updatedMap = await map.update(req.body);
    res.status(200).json(updatedMap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMap = async (req, res) => {
  try {
    const { id } = req.params;
    const map = await db.Map.findByPk(id);

    if (!map) {
      return res.status(404).json({ message: 'Map not found' });
    }

    if (map.userId !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to delete this map' });
    }

    await map.destroy();
    res.status(200).json({ message: 'Map deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.saveMapAsPNG = async (req, res) => {
  try {
    const { id } = req.params;
    const map = await db.Map.findByPk(id);

    if (!map) {
      return res.status(404).json({ message: 'Map not found' });
    }

    const grid = JSON.parse(map.grid);
    const html = generateHtml(grid);

    const image = await nodeHtmlToImage({
      html: html,
      quality: 100,
      type: 'png',
    });

    res.setHeader('Content-Type', 'image/png');
    res.send(image);
  } catch (error) {
    console.error('Error saving map as PNG:', error);
    res.status(500).json({ error: 'Failed to save map as PNG' });
  }
};

const generateHtml = (grid) => {
  const cellSize = 20;
  const rows = grid.map((row, rowIndex) => {
    const cells = row.map((cell, colIndex) => {
      return `<div style="width: ${cellSize}px; height: ${cellSize}px; background-color: ${getCellColor(cell)}; border: 1px solid black; box-sizing: border-box;"></div>`;
    }).join('');
    return `<div style="display: flex;">${cells}</div>`;
  }).join('');

  return `
    <div style="display: inline-block;">
      ${rows}
    </div>
  `;
};

const getCellColor = (cell) => {
  switch (cell) {
    case 'wall':
      return '#b0b0b0';
    case 'floor':
      return '#8B4513';
    case 'water':
      return '#a0c0ff';
    case 'object':
      return '#ffdfba';
    case 'grass':
      return '#7CFC00';
    case 'tree':
      return '#228B22';
    default:
      return 'white';
  }
};
