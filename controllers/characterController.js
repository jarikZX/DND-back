const db = require('../models');


const fetchCharacterDetails = async (characterId) => {
  return await db.Character.findByPk(characterId, {
    include: [
      { model: db.Inventory, as: 'Inventory', include: [
        { model: db.Armor, as: 'ArmorItem', attributes: ['id', 'name', 'defense', 'description', 'quality', 'icon'] },
        { model: db.Weapon, as: 'WeaponItem', attributes: ['id', 'name', 'attack', 'description', 'quality', 'icon'] },
        { model: db.Consumable, as: 'ConsumableItem', attributes: ['id', 'name', 'effect', 'description', 'quality', 'icon'] }
      ] },
      { model: db.Armor, as: 'Helmet', attributes: ['id', 'name', 'defense', 'description', 'quality', 'icon'] },
      { model: db.Armor, as: 'Chestplate', attributes: ['id', 'name', 'defense', 'description', 'quality', 'icon'] },
      { model: db.Armor, as: 'Ring1', attributes: ['id', 'name', 'defense', 'description', 'quality', 'icon'] },
      { model: db.Armor, as: 'Ring2', attributes: ['id', 'name', 'defense', 'description', 'quality', 'icon'] },
      { model: db.Armor, as: 'Amulet', attributes: ['id', 'name', 'defense', 'description', 'quality', 'icon'] },
      { model: db.Armor, as: 'Pants', attributes: ['id', 'name', 'defense', 'description', 'quality', 'icon'] },
      { model: db.Armor, as: 'Gloves', attributes: ['id', 'name', 'defense', 'description', 'quality', 'icon'] },
      { model: db.Armor, as: 'Boots', attributes: ['id', 'name', 'defense', 'description', 'quality', 'icon'] },
      { model: db.Armor, as: 'Shield', attributes: ['id', 'name', 'defense', 'description', 'quality', 'icon'] },
      { model: db.Weapon, as: 'Weapon', attributes: ['id', 'name', 'attack', 'description', 'quality', 'icon'] }
    ]
  });
};
const fetchCharacterWithClass = async (characterId) => {
  return await db.Character.findByPk(characterId, {
    include: [
      { model: db.Class},
      { model: db.Inventory, as: 'Inventory', include: [
        { model: db.Armor, as: 'ArmorItem', attributes: ['id', 'name', 'defense', 'description', 'quality', 'icon'] },
        { model: db.Weapon, as: 'WeaponItem', attributes: ['id', 'name', 'attack', 'description', 'quality', 'icon'] },
        { model: db.Consumable, as: 'ConsumableItem', attributes: ['id', 'name', 'effect', 'description', 'quality', 'icon'] }
      ] },
      { model: db.Armor, as: 'Helmet', attributes: ['id', 'name', 'defense', 'description', 'quality', 'icon'] },
      { model: db.Armor, as: 'Chestplate', attributes: ['id', 'name', 'defense', 'description', 'quality', 'icon'] },
      { model: db.Armor, as: 'Ring1', attributes: ['id', 'name', 'defense', 'description', 'quality', 'icon'] },
      { model: db.Armor, as: 'Ring2', attributes: ['id', 'name', 'defense', 'description', 'quality', 'icon'] },
      { model: db.Armor, as: 'Amulet', attributes: ['id', 'name', 'defense', 'description', 'quality', 'icon'] },
      { model: db.Armor, as: 'Pants', attributes: ['id', 'name', 'defense', 'description', 'quality', 'icon'] },
      { model: db.Armor, as: 'Gloves', attributes: ['id', 'name', 'defense', 'description', 'quality', 'icon'] },
      { model: db.Armor, as: 'Boots', attributes: ['id', 'name', 'defense', 'description', 'quality', 'icon'] },
      { model: db.Armor, as: 'Shield', attributes: ['id', 'name', 'defense', 'description', 'quality', 'icon'] },
      { model: db.Weapon, as: 'Weapon', attributes: ['id', 'name', 'attack', 'description', 'quality', 'icon'] }
    ]
  });
};

exports.getCharacterWithClass = async (req, res) => {
  try {
    const { id } = req.params;
    const character = await fetchCharacterWithClass(id);

    if (!character) {
      return res.status(404).json({ message: 'Персонаж не найден' });
    }

    res.status(200).json(character);
  } catch (error) {
    console.error('Ошибка при получении персонажа с классом:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
exports.createCharacter = async (req, res) => {
  const { name, classId, strength, agility, endurance, intellect, background, movementRange, inventory, equipment } = req.body;

  try {
    const character = await db.Character.create({
      name,
      level: 1,
      classId,
      strength,
      agility,
      endurance,
      intellect,
      background,
      movementRange,
      userId: req.user.id,
    });

    if (inventory && inventory.length > 0) {
      for (const item of inventory) {
        await db.Inventory.create({
          itemType: item.itemType,
          itemId: item.itemId,
          quantity: item.quantity,
          slot: item.slot,
          characterId: character.id
        });
      }
    }

    if (equipment) {
      await character.update(equipment);
    }

    const detailedCharacter = await fetchCharacterDetails(character.id);

    res.status(201).json(detailedCharacter);
  } catch (error) {
    console.error('Error creating character:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateCharacterEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const equipment = req.body;

    const character = await db.Character.findByPk(id);
    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }

    await character.update(equipment);
    const detailedCharacter = await fetchCharacterDetails(id);

    res.status(200).json(detailedCharacter);
  } catch (error) {
    console.error('Ошибка при обновлении экипировки персонажа:', error);
    res.status(400).json({ error: 'Не удалось обновить экипировку персонажа' });
  }
};

exports.updateCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const character = await db.Character.findByPk(id);

    if (!character) {
      return res.status(404).json({ message: 'Персонаж не найден' });
    }

    if (character.userId !== req.user.id) {
      return res.status(403).json({ message: 'Вы не авторизованы для обновления этого персонажа' });
    }

    const updatedCharacter = await character.update(req.body);
    const detailedCharacter = await fetchCharacterDetails(id);

    res.status(200).json(detailedCharacter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCharacters = async (req, res) => {
  try {
    const characters = await db.Character.findAll({
      where: { userId: req.user.id },
      include: [
        { model: db.Inventory, as: 'Inventory', include: [
          { model: db.Armor, as: 'ArmorItem', attributes: ['id', 'name', 'defense', 'description', 'quality', 'icon'] },
          { model: db.Weapon, as: 'WeaponItem', attributes: ['id', 'name', 'attack', 'description', 'quality', 'icon'] },
          { model: db.Consumable, as: 'ConsumableItem', attributes: ['id', 'name', 'effect', 'description', 'quality', 'icon'] }
        ] },
        { model: db.Armor, as: 'Helmet', attributes: ['id', 'name', 'defense', 'description', 'quality', 'icon'] },
        { model: db.Armor, as: 'Chestplate', attributes: ['id', 'name', 'defense', 'description', 'quality', 'icon'] },
        { model: db.Armor, as: 'Ring1', attributes: ['id', 'name', 'defense', 'description', 'quality', 'icon'] },
        { model: db.Armor, as: 'Ring2', attributes: ['id', 'name', 'defense', 'description', 'quality', 'icon'] },
        { model: db.Armor, as: 'Amulet', attributes: ['id', 'name', 'defense', 'description', 'quality', 'icon'] },
        { model: db.Armor, as: 'Pants', attributes: ['id', 'name', 'defense', 'description', 'quality', 'icon'] },
        { model: db.Armor, as: 'Gloves', attributes: ['id', 'name', 'defense', 'description', 'quality', 'icon'] },
        { model: db.Armor, as: 'Boots', attributes: ['id', 'name', 'defense', 'description', 'quality', 'icon'] },
        { model: db.Armor, as: 'Shield', attributes: ['id', 'name', 'defense', 'description', 'quality', 'icon'] },
        { model: db.Weapon, as: 'Weapon', attributes: ['id', 'name', 'attack', 'description', 'quality', 'icon'] }
      ]
    });

    const uniqueCharacters = characters.reduce((acc, character) => {
      if (!acc.find(c => c.id === character.id)) {
        acc.push(character);
      }
      return acc;
    }, []);

    res.status(200).json(uniqueCharacters);
  } catch (error) {
    console.error('Error fetching characters:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const character = await db.Character.findByPk(id);

    if (!character) {
      return res.status(404).json({ message: 'Персонаж не найден' });
    }

    if (character.userId !== req.user.id) {
      return res.status(403).json({ message: 'Вы не авторизованы для удаления этого персонажа' });
    }

    await character.destroy();
    res.status(200).json({ message: 'Персонаж успешно удален' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.moveItemToInventory = async (req, res) => {
  const { characterId } = req.params;
  const { itemId, slotIndex, itemType } = req.body;

  try {
    const character = await db.Character.findByPk(characterId);
    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }

    const equipmentField = itemType.toLowerCase();
    await character.update({ [equipmentField]: null });

    const newItem = await db.Inventory.create({
      characterId,
      itemType,
      itemId,
      slot: slotIndex,
    });

    const updatedCharacter = await fetchCharacterDetails(characterId);

    res.status(200).json({ character: updatedCharacter, newItem });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.moveItemToEquipment = async (req, res) => {
  const { characterId } = req.params;
  const { itemId, equipmentSlot, itemType } = req.body;

  try {
    const character = await db.Character.findByPk(characterId);
    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }

    await character.update({ [equipmentSlot]: itemId });

    await db.Inventory.destroy({ where: { characterId, itemId, itemType } });

    const updatedCharacter = await fetchCharacterDetails(characterId);

    res.status(200).json(updatedCharacter);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

