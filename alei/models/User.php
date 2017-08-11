<?php

namespace frontend\models;

use Yii;

/**
 * This is the model class for table "{{%user}}".
 *
 * @property string $Id
 * @property string $Account
 * @property string $Password
 * @property string $Nickname
 * @property string $AvatarUrl
 * @property string $Auth_Status
 * @property string $Id_Card
 * @property string $Name
 * @property string $Mobile
 * @property string $Weixin_Open_Id
 * @property string $Last_Login_Ip
 * @property string $Last_Login_Time
 * @property string $Registration_IP
 * @property string $Registration_Channel
 * @property string $Balance
 * @property string $Bonus_Target
 * @property string $Bonus_Level
 * @property string $Bonus_Level_Yesterday
 * @property string $Bonus_Today
 * @property string $Score
 * @property string $Inviter
 * @property string $Parent
 * @property string $ggfather
 * @property string $Inviter_Grade
 * @property string $Status
 * @property string $Status_Change_Reason
 * @property string $Creation_Time
 * @property string $Bonus_Day
 * @property integer $Is_Cash_white
 * @property string $Login_Error_Num
 * @property string $Pause_Bonus
 */
class User extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%user}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['AvatarUrl'], 'required'],
            [['AvatarUrl', 'Status_Change_Reason'], 'string'],
            [['Last_Login_Time', 'Bonus_Level', 'Bonus_Level_Yesterday', 'Score', 'Inviter', 'Parent', 'ggfather', 'Inviter_Grade', 'Creation_Time', 'Is_Cash_white', 'Login_Error_Num', 'Pause_Bonus'], 'integer'],
            [['Balance', 'Bonus_Target', 'Bonus_Today'], 'number'],
            [['Bonus_Day'], 'safe'],
            [['Account', 'Password', 'Nickname', 'Auth_Status', 'Id_Card', 'Name', 'Mobile', 'Weixin_Open_Id', 'Last_Login_Ip'], 'string', 'max' => 128],
            [['Registration_IP', 'Registration_Channel', 'Status'], 'string', 'max' => 255],
            [['Mobile'], 'unique'],
            [['Account'], 'unique'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'Id' => 'ID',
            'Account' => 'Account',
            'Password' => 'Password',
            'Nickname' => 'Nickname',
            'AvatarUrl' => 'Avatar Url',
            'Auth_Status' => 'Auth  Status',
            'Id_Card' => 'Id  Card',
            'Name' => 'Name',
            'Mobile' => 'Mobile',
            'Weixin_Open_Id' => 'Weixin  Open  ID',
            'Last_Login_Ip' => 'Last  Login  Ip',
            'Last_Login_Time' => 'Last  Login  Time',
            'Registration_IP' => 'Registration  Ip',
            'Registration_Channel' => 'Registration  Channel',
            'Balance' => 'Balance',
            'Bonus_Target' => 'Bonus  Target',
            'Bonus_Level' => 'Bonus  Level',
            'Bonus_Level_Yesterday' => 'Bonus  Level  Yesterday',
            'Bonus_Today' => 'Bonus  Today',
            'Score' => 'Score',
            'Inviter' => 'Inviter',
            'Parent' => 'Parent',
            'ggfather' => 'Ggfather',
            'Inviter_Grade' => 'Inviter  Grade',
            'Status' => 'Status',
            'Status_Change_Reason' => 'Status  Change  Reason',
            'Creation_Time' => 'Creation  Time',
            'Bonus_Day' => 'Bonus  Day',
            'Is_Cash_white' => 'Is  Cash White',
            'Login_Error_Num' => 'Login  Error  Num',
            'Pause_Bonus' => 'Pause  Bonus',
        ];
    }
}
