<?php

namespace frontend\models;

use Yii;

/**
 * This is the model class for table "{{%goods}}".
 *
 * @property string $Id
 * @property string $Type_Id
 * @property string $Name
 * @property string $Tag_Ids
 * @property string $Remarks
 * @property string $Desc
 * @property string $ThumbnailUrl
 * @property string $Cost
 * @property string $Base_Price
 * @property string $Group_Price
 * @property string $Market_Price
 * @property string $Images
 * @property string $Property
 * @property string $Content
 * @property string $Sale_Count
 * @property string $Sale_Count_Add
 * @property string $Status
 * @property string $Business_Id
 * @property string $Business_Name
 * @property string $Keywords
 * @property string $Creation_Time
 * @property integer $Recommend
 * @property integer $Cart_Recommend
 * @property string $Add_Id
 * @property string $Edit_Id
 * @property string $Goods_Url
 * @property string $Sorting
 * @property string $Goods_Store_Id
 * @property string $Delete_Time
 * @property string $Brand_Id
 * @property string $Version
 * @property integer $Is_Overseas
 * @property string $Stock_Num
 */
class Goods extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%goods}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['Type_Id', 'Sale_Count', 'Sale_Count_Add', 'Business_Id', 'Creation_Time', 'Recommend', 'Cart_Recommend', 'Add_Id', 'Edit_Id', 'Goods_Store_Id', 'Delete_Time', 'Brand_Id', 'Is_Overseas', 'Stock_Num'], 'integer'],
            [['Tag_Ids', 'Desc', 'ThumbnailUrl', 'Group_Price', 'Images', 'Property', 'Content', 'Keywords', 'Goods_Url'], 'string'],
            [['Remarks', 'Group_Price', 'Market_Price'], 'required'],
            [['Cost', 'Base_Price', 'Market_Price'], 'number'],
            [['Name', 'Remarks', 'Status', 'Business_Name', 'Sorting', 'Version'], 'string', 'max' => 255],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'Id' => 'ID',
            'Type_Id' => 'Type  ID',
            'Name' => 'Name',
            'Tag_Ids' => 'Tag  Ids',
            'Remarks' => 'Remarks',
            'Desc' => 'Desc',
            'ThumbnailUrl' => 'Thumbnail Url',
            'Cost' => 'Cost',
            'Base_Price' => 'Base  Price',
            'Group_Price' => 'Group  Price',
            'Market_Price' => 'Market  Price',
            'Images' => 'Images',
            'Property' => 'Property',
            'Content' => 'Content',
            'Sale_Count' => 'Sale  Count',
            'Sale_Count_Add' => 'Sale  Count  Add',
            'Status' => 'Status',
            'Business_Id' => 'Business  ID',
            'Business_Name' => 'Business  Name',
            'Keywords' => 'Keywords',
            'Creation_Time' => 'Creation  Time',
            'Recommend' => 'Recommend',
            'Cart_Recommend' => 'Cart  Recommend',
            'Add_Id' => 'Add  ID',
            'Edit_Id' => 'Edit  ID',
            'Goods_Url' => 'Goods  Url',
            'Sorting' => 'Sorting',
            'Goods_Store_Id' => 'Goods  Store  ID',
            'Delete_Time' => 'Delete  Time',
            'Brand_Id' => 'Brand  ID',
            'Version' => 'Version',
            'Is_Overseas' => 'Is  Overseas',
            'Stock_Num' => 'Stock  Num',
        ];
    }
}
