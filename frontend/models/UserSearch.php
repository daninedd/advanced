<?php

namespace frontend\models;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use frontend\models\User;

/**
 * UserSearch represents the model behind the search form about `frontend\models\User`.
 */
class UserSearch extends User
{
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['Id', 'Last_Login_Time', 'Bonus_Level', 'Bonus_Level_Yesterday', 'Score', 'Inviter', 'Parent', 'ggfather', 'Inviter_Grade', 'Creation_Time', 'Is_Cash_white', 'Login_Error_Num', 'Pause_Bonus'], 'integer'],
            [['Account', 'Password', 'Nickname', 'AvatarUrl', 'Auth_Status', 'Id_Card', 'Name', 'Mobile', 'Weixin_Open_Id', 'Last_Login_Ip', 'Registration_IP', 'Registration_Channel', 'Status', 'Status_Change_Reason', 'Bonus_Day'], 'safe'],
            [['Balance', 'Bonus_Target', 'Bonus_Today'], 'number'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = User::find();

        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        // grid filtering conditions
        $query->andFilterWhere([
            'Id' => $this->Id,
            'Last_Login_Time' => $this->Last_Login_Time,
            'Balance' => $this->Balance,
            'Bonus_Target' => $this->Bonus_Target,
            'Bonus_Level' => $this->Bonus_Level,
            'Bonus_Level_Yesterday' => $this->Bonus_Level_Yesterday,
            'Bonus_Today' => $this->Bonus_Today,
            'Score' => $this->Score,
            'Inviter' => $this->Inviter,
            'Parent' => $this->Parent,
            'ggfather' => $this->ggfather,
            'Inviter_Grade' => $this->Inviter_Grade,
            'Creation_Time' => $this->Creation_Time,
            'Bonus_Day' => $this->Bonus_Day,
            'Is_Cash_white' => $this->Is_Cash_white,
            'Login_Error_Num' => $this->Login_Error_Num,
            'Pause_Bonus' => $this->Pause_Bonus,
        ]);

        $query->andFilterWhere(['like', 'Account', $this->Account])
            ->andFilterWhere(['like', 'Password', $this->Password])
            ->andFilterWhere(['like', 'Nickname', $this->Nickname])
            ->andFilterWhere(['like', 'AvatarUrl', $this->AvatarUrl])
            ->andFilterWhere(['like', 'Auth_Status', $this->Auth_Status])
            ->andFilterWhere(['like', 'Id_Card', $this->Id_Card])
            ->andFilterWhere(['like', 'Name', $this->Name])
            ->andFilterWhere(['like', 'Mobile', $this->Mobile])
            ->andFilterWhere(['like', 'Weixin_Open_Id', $this->Weixin_Open_Id])
            ->andFilterWhere(['like', 'Last_Login_Ip', $this->Last_Login_Ip])
            ->andFilterWhere(['like', 'Registration_IP', $this->Registration_IP])
            ->andFilterWhere(['like', 'Registration_Channel', $this->Registration_Channel])
            ->andFilterWhere(['like', 'Status', $this->Status])
            ->andFilterWhere(['like', 'Status_Change_Reason', $this->Status_Change_Reason]);

        return $dataProvider;
    }
}
