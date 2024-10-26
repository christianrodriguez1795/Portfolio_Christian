<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'urlGitHub',
        'urlSitio',
        'image',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'project_category');
    }

    public function skills()
    {
        return $this->belongsToMany(Skill::class, 'project_skill');
    }

    public function details()
    {
        return $this->hasMany(ProjectDetail::class);
    }
}
