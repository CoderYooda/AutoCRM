<?php

namespace App\Http\Controllers;

use App\Models\ICat\ACat;
use App\Models\iCat\CatMark;
use App\Models\iCat\CatModel;
use App\Models\iCat\CatModify;
use App\Models\iCat\CatType;
use Illuminate\Http\Request;

class CatalogueController extends Controller
{
    public static function getMarks()
    {
        $types = CatType::with('marks')->get();

        if(!$types->count()){
            $acat = new ACat('ac0312e3c94b0fc48d6c01fea6828bee');
            $result = $acat->getMarks();


            foreach($result as $type){
                $t = CatType::create([
                    'index' => $type->index ?? null,
                    'name' => $type->name ?? null,
                    'value' => $type->value ?? null,
                    'image' => $type->image ?? null,
                ]);

                foreach($type->marks as $mark){
                    CatMark::create([
                        'type_id' => $t->id ?? null,
                        'name' => $mark->name ?? null,
                        'full_name' => $mark->full_name ?? null,
                        'short_name' => $mark->short_name ?? null,
                        'url' => $mark->url ?? null,
                        'value' => $mark->value ?? null,
                        'SKD' => $mark->SKD ?? null,
                        'archival' => $mark->archival ?? null,
                        'description' => $mark->description ?? null,
                        'engine' => $mark->engine ?? null,
                        'image' => $mark->image ?? null,
                        'vin' => $mark->vin ?? null,
                    ]);
                }

            }
            $types = CatType::with('marks')->get();
        }
        return $types;
    }

    public function getModels(Request $request)
    {
        $models = CatModel::where('mark_id', $request['mark_id'])->get();
        if(!$models->count()){
            $mark = CatMark::find($request['mark_id']);

            $href = '/' . $mark->type()->first()->value . '/' . $mark->value;
            $acat = new ACat('ac0312e3c94b0fc48d6c01fea6828bee');
            $result = $acat->getModels($href);

            foreach($result->models as $model) {
                $m = CatModel::create([
                    'type_id' => $mark->type()->first()->id,
                    'mark_id' => $mark->id ?? null,
                    'image' => $model->image ?? $model->img ?? null,
                    'model' => $model->id ?? null,
                    'archival' => $model->archival ?? false,
                    'name' => $model->name ?? null,
                    'short_name' => $model->short_name ?? null,
                    'modification' => $model->modification ?? null,
                    'name_with_mark' => $model->name_with_mark ?? null,
                    'index' => $model->index ?? null,
                    'relevance' => $model->relevance ?? null,
                    'modif' => $model->modif ?? null,
                ]);
            }

            $models = CatModel::where('mark_id', $request['mark_id'])->get();
        }

        $view = view(get_template() . '.catalogue.models', compact('models', 'request'))->render();
        return response()->json(['view' => $view]);
    }

    public function getModifications(Request $request)
    {
        $modifications = CatModify::where('model_id', $request['model_id'])->paginate(25);
        $model = CatModel::find($request['model_id']);
        if(!$modifications->count()) {

            $model = CatModel::find($request['model_id']);

            $mark = $model->mark()->first();

            $href = '/' . $mark->type()->first()->value . '/' . $mark->value . '/' . $model->model;

            $acat = new ACat('ac0312e3c94b0fc48d6c01fea6828bee');
            $result = $acat->getModificationsByModel($href);

            foreach ($result->pages as $page){
                $acat = new ACat('ac0312e3c94b0fc48d6c01fea6828bee');
                $result = $acat->getModificationsByModel($href . '?page=' . $page);
                foreach($result->modifications as $modification) {
                    $m = CatModify::create([
                        'model_id' => $model->id,
                        'cat_id' => $modification->id ?? null,
                        'catalogId' => $modification-> catalogId ?? null,
                        'name' => $modification->name ?? null,
                        'description' => $modification->description ?? null,
                        'region' => $modification->region ?? null,
                        'year' => $modification->year ?? null,
                        'steering' => $modification->steering ?? null,
                        'steeringId' => $modification->steeringId ?? null,
                        'bodyType' => $modification->bodyType ?? null,
                        'engine' => $modification->engine ?? null,
                        'transmission' => $modification->transmission->name ?? null,
                    ]);
                }
            }

            $modifications = CatModify::where('model_id', $request['model_id'])->paginate(25);
        }

        $view = view(get_template() . '.catalogue.modifications', compact('modifications','model', 'request'))->render();
        return response()->json(['view' => $view]);
    }
}
