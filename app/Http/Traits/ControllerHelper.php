<?php


namespace App\Http\Traits;


use Illuminate\Http\Request;

trait ControllerHelper
{
    /**
     * @param Request $request
     * @return \Illuminate\Support\Collection
     */
    private function filterRequest(Request $request)
    {
        return collect($request->all())
            ->filter(function ($item) {
                return !!$item;
            });
    }
}