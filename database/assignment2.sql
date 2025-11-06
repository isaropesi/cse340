-- QUERY 1: Insert new record for Tony Stark
INSERT INTO account (
        account_firstname,
        account_lastname,
        account_email,
        account_password
    )
VALUES (
        'Tony',
        'Stark',
        'tony@starkent.com',
        'Iam1ronM@n'
    );
-- QUERY 2: Modify Tony Stark's account_type to 'Admin'
UPDATE account
SET account_type = 'Admin'
WHERE account_email = 'tony@starkent.com';
-- QUERY 3: Delete Tony Stark's record
DELETE FROM account
WHERE account_email = 'tony@starkent.com';
-- QUERY 4: Update GM Hummer description using REPLACE()
UPDATE inventory
SET inv_description = REPLACE(
        inv_description,
        'the small interiors',
        'a huge interior'
    )
WHERE inv_make = 'GM'
    AND inv_model = 'Hummer';
-- QUERY 5: INNER JOIN to select Sport vehicles
SELECT i.inv_make,
    i.inv_model,
    c.classification_name
FROM inventory AS i
    INNER JOIN classification AS c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';
-- QUERY 6: Update image and thumbnail file paths using REPLACE()
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');